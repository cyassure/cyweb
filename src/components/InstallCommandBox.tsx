import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface InstallCommandBoxProps {
  version: string;
}

const INSTALLER_REPO = "cyassure/get-cy360";

const InstallCommandBox = ({ version }: InstallCommandBoxProps) => {
  const [copied, setCopied] = useState(false);

  const versionFlag = version === "latest" ? "" : ` --version ${version}`;
  // Download-then-run against a real file, not `curl | bash` and not
  // `bash <(curl ...)` either — both were tried and both are broken:
  //   - `curl | bash`: the installer's own interactive prompts (base domain,
  //     environment type, TLS mode) read from stdin, which is also the pipe
  //     carrying the script itself — every prompt silently falls through to
  //     its default instead of pausing.
  //   - `sudo bash <(curl ...)`: process substitution hands bash a
  //     `/dev/fd/N` path that's only valid in the *calling* shell. Modern
  //     `sudo` closes fds above stderr before exec'ing the target command
  //     (closefrom, default since sudo 1.8.x) — so that fd is gone by the
  //     time bash-as-root tries to open it: "No such file or directory".
  // `-o file && sudo bash file` sidesteps both: bash reads a real path with
  // no fd-inheritance dependency, and the real terminal stays on stdin the
  // whole time since bash never consumes the script through it.
  const command = `curl -fsSL https://raw.githubusercontent.com/${INSTALLER_REPO}/main/install.sh -o cyassure-setup.sh && sudo bash cyassure-setup.sh${versionFlag}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-border bg-secondary/40 p-1.5">
      <div className="flex items-center gap-3 rounded-lg bg-background/60 px-4 py-3.5">
        <code className="flex-1 overflow-x-auto whitespace-pre text-xs text-foreground sm:text-sm">
          {command}
        </code>
        <button
          onClick={handleCopy}
          className="flex shrink-0 items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
          aria-label="Copy install command"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-primary" /> Copied
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" /> Copy
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default InstallCommandBox;
