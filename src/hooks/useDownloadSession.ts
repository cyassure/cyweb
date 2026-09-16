import { useQuery } from "@tanstack/react-query";

interface SessionResponse {
  verified: boolean;
  name?: string;
  email?: string;
}

async function fetchSession(): Promise<SessionResponse> {
  const res = await fetch("/api/session", { credentials: "same-origin" });
  if (!res.ok) throw new Error(`session fetch returned ${res.status}`);
  return res.json();
}

interface UseDownloadSessionOptions {
  /** While true, poll frequently so a verification completed in another tab unlocks this one. */
  pollForVerification?: boolean;
}

export function useDownloadSession({ pollForVerification = false }: UseDownloadSessionOptions = {}) {
  const query = useQuery({
    queryKey: ["download-session"],
    queryFn: fetchSession,
    staleTime: 0,
    retry: 1,
    refetchInterval: pollForVerification ? 4000 : false,
  });

  return {
    verified: query.data?.verified ?? false,
    name: query.data?.name,
    isLoading: query.isLoading,
    refetch: query.refetch,
  };
}
