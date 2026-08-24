import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useReleases } from "@/hooks/useReleases";

interface VersionPickerProps {
  value: string;
  onChange: (version: string) => void;
}

const VersionPicker = ({ value, onChange }: VersionPickerProps) => {
  const { versions, isLive, isLoading } = useReleases();

  if (isLoading) {
    return <Skeleton className="h-10 w-full max-w-xs rounded-lg" />;
  }

  return (
    <div>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full max-w-xs bg-card">
          <SelectValue placeholder="Select a version" />
        </SelectTrigger>
        <SelectContent>
          {versions.map((v) => (
            <SelectItem key={v} value={v}>
              {v === "latest" ? "Latest (recommended)" : v}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {!isLive && (
        <p className="mt-2 text-xs text-muted-foreground/70">
          Showing a recent snapshot of versions — live version sync is coming soon.
        </p>
      )}
    </div>
  );
};

export default VersionPicker;
