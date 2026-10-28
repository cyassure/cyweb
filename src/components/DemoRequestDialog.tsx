import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import * as z from "zod";
import { ArrowLeft, ArrowRight, CalendarClock, PlayCircle, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { demos, formatDuration } from "@/lib/demos";

const formSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name"),
  email: z.string().trim().email("Please enter a valid work email address"),
  company: z.string().trim().min(1, "Please enter your company"),
  preferredTime: z.string().trim().max(200).optional(),
  interests: z.string().trim().max(2000).optional(),
});

type FormValues = z.infer<typeof formSchema>;

async function submitLiveDemoRequest(values: FormValues): Promise<void> {
  const message = [
    `Live demo request`,
    `Company: ${values.company}`,
    `Preferred date/time: ${values.preferredTime || "not specified"}`,
    `Interested in: ${values.interests || "not specified"}`,
  ].join("\n");
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify({
      name: values.name,
      email: values.email,
      topic: "Live demo request (website)",
      message,
      destination: "sales",
    }),
  });
  if (!res.ok) throw new Error(`demo request returned ${res.status}`);
}

const totalMinutes = Math.round(demos.reduce((sum, d) => sum + d.duration, 0) / 60);

interface DemoRequestDialogProps {
  /** The button that opens the dialog. */
  trigger: ReactNode;
  /** Open straight on the live-demo form instead of the choice screen. */
  startWithLive?: boolean;
}

const DemoRequestDialog = ({ trigger, startWithLive = false }: DemoRequestDialogProps) => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"choose" | "live">(startWithLive ? "live" : "choose");
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", company: "", preferredTime: "", interests: "" },
  });

  const mutation = useMutation({
    mutationFn: submitLiveDemoRequest,
    onSuccess: () => {
      toast.success("Request sent — we'll e-mail you to confirm a time for your live demo.");
      setOpen(false);
      form.reset();
    },
  });

  const onOpenChange = (next: boolean) => {
    setOpen(next);
    if (next) setStep(startWithLive ? "live" : "choose");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-xl">
        {step === "choose" ? (
          <>
            <DialogHeader>
              <DialogTitle>See Cy360 in action</DialogTitle>
              <DialogDescription>Watch the recorded demos right away, or book a live walkthrough with our team.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 sm:grid-cols-2">
              <Link
                to="/demos"
                onClick={() => setOpen(false)}
                className="group flex flex-col rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/50"
              >
                <PlayCircle className="mb-3 h-8 w-8 text-primary" />
                <span className="mb-1 text-lg font-semibold leading-snug text-foreground">Watch recorded demos</span>
                <span className="mb-4 flex-1 text-sm text-muted-foreground">
                  Start now, no sign-up. A {formatDuration(demos[0].duration)} platform overview and {demos.length - 1}{" "}
                  module walkthroughs ({totalMinutes} min in total).
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
                  Watch now <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
              <button
                type="button"
                onClick={() => setStep("live")}
                className="group flex flex-col rounded-xl border border-border bg-card p-5 text-left transition-all hover:border-primary/50"
              >
                <CalendarClock className="mb-3 h-8 w-8 text-primary" />
                <span className="mb-1 text-lg font-semibold leading-snug text-foreground">Book a live demo</span>
                <span className="mb-4 flex-1 text-sm text-muted-foreground">
                  A guided session with a CyAssure expert, focused on your environment and questions.
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
                  Request a time <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Book a live demo</DialogTitle>
              <DialogDescription>Tell us a little about you and we'll e-mail you to confirm a time.</DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit((values) => mutation.mutate(values))} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
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
                </div>
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company</FormLabel>
                      <FormControl>
                        <Input placeholder="Acme Corp" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="preferredTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred date and time (optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Tuesday afternoon, CET" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="interests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What would you like to see? (optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={3}
                          placeholder="e.g. endpoint protection, attack surface, compliance (ISO 27001, NIS2)…"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full gap-2" disabled={mutation.isPending}>
                  <Send className="h-4 w-4" /> {mutation.isPending ? "Sending..." : "Request live demo"}
                </Button>
                {mutation.isError && (
                  <p className="text-sm text-destructive">Something went wrong — please try again in a moment.</p>
                )}
                <div className="flex items-center justify-between text-sm">
                  {!startWithLive ? (
                    <button
                      type="button"
                      onClick={() => setStep("choose")}
                      className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
                    >
                      <ArrowLeft className="h-3 w-3" /> Back
                    </button>
                  ) : <span />}
                  <Link to="/demos" onClick={() => setOpen(false)} className="text-primary hover:underline">
                    Or watch the recorded demos now
                  </Link>
                </div>
              </form>
            </Form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DemoRequestDialog;
