import { z } from 'zod';

export const profileSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Valid phone required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  targetExam: z.string().optional(),
  entranceScore: z.coerce.number().optional(),
  budgetMax: z.coerce.number().optional(),
  preferredStreams: z.array(z.string()).optional(),
  bio: z.string().optional(),
});
