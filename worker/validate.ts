import { z } from "zod";

export const registrationSchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  company: z.string().trim().min(1).max(200),
  phone: z.string().trim().max(50).optional().or(z.literal("")),
  role: z.string().trim().max(200).optional().or(z.literal("")),
  city: z.string().trim().max(200).optional().or(z.literal("")),
  country: z.string().trim().max(200).optional().or(z.literal("")),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;

export const contactSchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  topic: z.string().trim().max(100).optional().or(z.literal("")),
  message: z.string().trim().min(1).max(5000),
  destination: z.enum(["sales", "support"]),
});

export type ContactInput = z.infer<typeof contactSchema>;
