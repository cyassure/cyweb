import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import * as z from "zod";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const sources = ["Microsoft 365", "Google Workspace", "Endpoints (Windows / macOS / Linux)", "Not sure yet"] as const;

const formSchema = z.object({
  name: z.string().min(1, "Please enter your name"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(1, "Please enter your company"),
  source: z.enum(sources, { required_error: "Pick where your data lives" }),
  notes: z.string().max(2000).optional(),
});

type FormValues = z.infer<typeof formSchema>;

// There is no self-service DLP scan; requests go to sales via /api/contact, the
// same route as SalesContactDialog, and the team sets up the scan with the customer.
async function submitDlpScanRequest(values: FormValues): Promise<void> {
  const message = [
    `Company: ${values.company}`,
    `Scan source: ${values.source}`,
    values.notes ? `\n${values.notes}` : "",
  ].join("\n");
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify({
      name: values.name,
      email: values.email,
      topic: "Free DLP scan request (website)",
      message,
      destination: "sales",
    }),
  });
  if (!res.ok) throw new Error(`contact submission returned ${res.status}`);
}

const DlpScanDialog = ({ trigger }: { trigger: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", company: "", notes: "" },
  });

  const mutation = useMutation({
    mutationFn: submitDlpScanRequest,
    onSuccess: () => {
      toast.success("Request received. We'll email you to set up your DLP scan.");
      setOpen(false);
      form.reset();
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Request a free DLP scan</DialogTitle>
          <DialogDescription>
            We connect Cy360 read-only to one data source and send you a report of the sensitive data we find.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit((values) => mutation.mutate(values))} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Jane Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Work email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="you@company.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input placeholder="Company B.V." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="source"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What should we scan?</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a data source" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sources.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Anything we should know? (optional)</FormLabel>
                  <FormControl>
                    <Textarea rows={3} placeholder="Number of mailboxes, regulations you report against..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full gap-2" disabled={mutation.isPending}>
              <Send className="h-4 w-4" /> {mutation.isPending ? "Sending..." : "Request my DLP scan"}
            </Button>
            {mutation.isError && (
              <p className="text-sm text-destructive">Something went wrong. Please try again in a moment.</p>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DlpScanDialog;
