import { useQuery } from "@tanstack/react-query";

// Points at the small public installer mirror repo (cyassure/get-cy360), not the
// private cyassure/cy360 product repo (which 404s/rate-limits for anonymous
// requests). manifest.json is a plain file served from raw.githubusercontent.com —
// no GitHub API auth/rate-limit concerns, and it's kept in sync with real Cy360
// releases by that repo's own publish step.
const MANIFEST_URL = "https://raw.githubusercontent.com/cyassure/get-cy360/main/manifest.json";

export const FALLBACK_VERSIONS = [
  "latest",
  "v0.0.77",
  "v0.0.76",
  "v0.0.75",
  "v0.0.74",
  "v0.0.73",
];

interface VersionManifest {
  latest: string;
  versions: string[];
}

async function fetchVersions(): Promise<string[]> {
  const res = await fetch(MANIFEST_URL);
  if (!res.ok) throw new Error(`manifest.json fetch returned ${res.status}`);
  const manifest: VersionManifest = await res.json();
  const versions = manifest.versions.filter((v) => v !== "latest");
  return ["latest", ...versions];
}

export function useReleases() {
  const query = useQuery({
    queryKey: ["cy360-releases"],
    queryFn: fetchVersions,
    staleTime: 15 * 60 * 1000,
    retry: 1,
  });

  return {
    versions: query.data ?? FALLBACK_VERSIONS,
    isLive: !!query.data,
    isLoading: query.isLoading,
    isError: query.isError,
  };
}
