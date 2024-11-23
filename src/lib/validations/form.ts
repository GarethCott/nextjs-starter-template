import * as z from 'zod';

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(50, { message: 'Name must not exceed 50 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  subject: z
    .string()
    .min(5, { message: 'Subject must be at least 5 characters' })
    .max(100, { message: 'Subject must not exceed 100 characters' }),
  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters' })
    .max(1000, { message: 'Message must not exceed 1000 characters' }),
});

export const profileFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters' })
    .max(20, { message: 'Username must not exceed 20 characters' })
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message:
        'Username can only contain letters, numbers, underscores, and dashes',
    }),
  bio: z
    .string()
    .max(160, { message: 'Bio must not exceed 160 characters' })
    .optional(),
  website: z
    .string()
    .url({ message: 'Please enter a valid URL' })
    .optional()
    .or(z.literal('')),
  location: z
    .string()
    .max(30, { message: 'Location must not exceed 30 characters' })
    .optional(),
});

export const newsletterFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  preferences: z
    .array(z.string())
    .min(1, { message: 'Please select at least one preference' }),
  frequency: z.enum(['daily', 'weekly', 'monthly'], {
    required_error: 'Please select a frequency',
  }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
export type ProfileFormValues = z.infer<typeof profileFormSchema>;
export type NewsletterFormValues = z.infer<typeof newsletterFormSchema>;
