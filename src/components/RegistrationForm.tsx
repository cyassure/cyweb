import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import * as z from "zod";
import { Mail, ShieldCheck, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(1, "Please enter your name"),
  email: z.string().email("Please enter a valid work email address"),
  company: z.string().min(1, "Please enter your company"),
  phone: z.string().optional(),
  role: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

async function registerDownloader(values: FormValues): Promise<void> {
  const res = await fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify(values),
  });
  if (!res.ok) throw new Error(`register returned ${res.status}`);
}

interface RegistrationFormProps {
  onSubmitted: (email: string) => void;
}

const RegistrationForm = ({ onSubmitted }: RegistrationFormProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", company: "", phone: "", role: "", city: "", country: "" },
  });

  const mutation = useMutation({
    mutationFn: registerDownloader,
    onSuccess: (_data, values) => onSubmitted(values.email),
  });

  const onSubmit = (values: FormValues) => mutation.mutate(values);

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
                <Input placeholder="Acme Inc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="+1 555 123 4567" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job role / use case</FormLabel>
                <FormControl>
                  <Input placeholder="SOC Analyst, evaluating for prod" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="Rijswijk" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input placeholder="Netherlands" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full gap-2 sm:w-auto" disabled={mutation.isPending}>
          <Send className="h-4 w-4" /> {mutation.isPending ? "Sending..." : "Register & continue"}
        </Button>

        {mutation.isError && (
          <p className="text-sm text-destructive">Something went wrong — please try again in a moment.</p>
        )}

        <p className="flex items-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5" />
          We'll email you a one-click confirmation link before unlocking the install command.
        </p>
        <p className="flex items-center gap-2 text-xs text-muted-foreground/70">
          <Mail className="h-3.5 w-3.5" />
          Used to identify your organization for support and licensing — never shared or sold.
        </p>
      </form>
    </Form>
  );
};

export default RegistrationForm;
