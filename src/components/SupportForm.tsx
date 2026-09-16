import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import * as z from "zod";
import { CheckCircle2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const topics = [
  { value: "installation", label: "Installation / setup" },
  { value: "licensing", label: "Licensing / Enterprise" },
  { value: "bug", label: "Something isn't working" },
  { value: "sales", label: "Sales question" },
  { value: "other", label: "Other" },
];

const formSchema = z.object({
  name: z.string().min(1, "Please enter your name"),
  email: z.string().email("Please enter a valid email address"),
  topic: z.string().min(1, "Please select a topic"),
  message: z.string().min(10, "Please add a few more details (at least 10 characters)"),
});

type FormValues = z.infer<typeof formSchema>;

async function submitContact(values: FormValues): Promise<void> {
  const topicLabel = topics.find((t) => t.value === values.topic)?.label ?? values.topic;
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify({
      name: values.name,
      email: values.email,
      topic: topicLabel,
      message: values.message,
      destination: values.topic === "sales" ? "sales" : "support",
    }),
  });
  if (!res.ok) throw new Error(`contact submission returned ${res.status}`);
}

const SupportForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", topic: "", message: "" },
  });

  const mutation = useMutation({ mutationFn: submitContact });

  const onSubmit = (values: FormValues) => mutation.mutate(values);

  if (mutation.isSuccess) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-10 text-center">
        <CheckCircle2 className="h-8 w-8 text-primary" />
        <p className="font-heading text-lg font-semibold text-foreground">Message sent</p>
        <p className="max-w-sm text-sm text-muted-foreground">
          Thanks — we'll get back to you at the email address you provided.
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
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
                <FormLabel>Email</FormLabel>
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
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Topic</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="What's this about?" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {topics.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
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
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>How can we help?</FormLabel>
              <FormControl>
                <Textarea rows={5} placeholder="Tell us what's going on..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full gap-2 sm:w-auto" disabled={mutation.isPending}>
          <Send className="h-4 w-4" /> {mutation.isPending ? "Sending..." : "Send message"}
        </Button>

        {mutation.isError && (
          <p className="text-sm text-destructive">Something went wrong — please try again in a moment.</p>
        )}
      </form>
    </Form>
  );
};

export default SupportForm;
