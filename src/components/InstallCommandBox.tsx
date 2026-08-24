import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface InstallCommandBoxProps {
  version: string;
}

const INSTALLER_REPO = "cyassure/get-cy360";

const InstallCommandBox = ({ version }: InstallCommandBoxProps) => {
  const [copied, setCopied] = useState(false);

  const versionFlag = version === "latest" ? "" : ` --version ${version}`;
  // Download-then-run via process substitution, not `curl | bash`: piping the
  // script straight into bash's stdin means the installer's own interactive
  // prompts (base domain, environment type, TLS mode) also read from that
  // same stdin — bash has already consumed it reading the script itself, so
  // every prompt silently falls through to its default instead of pausing.
  // `bash <(curl ...)` keeps the real terminal on stdin while still being a
  // single copy-pasteable command. `sudo` is required — cyassure-setup.sh
  // hard-exits if not run as root.
  const command = `sudo bash <(curl -fsSL https://raw.githubusercontent.com/${INSTALLER_REPO}/main/install.sh)${versionFlag}`;

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
