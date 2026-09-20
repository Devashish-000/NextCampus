import { z } from 'zod';

export const reviewSchema = z.object({
  collegeId: z.string().min(1, 'Please select a college'),
  courseName: z.string().min(1, 'Course name is required'),
  batchYear: z.coerce.number().min(2000).max(2028),
  overallRating: z.coerce.number().min(1).max(5),
  placementsRating: z.coerce.number().min(1).max(5),
  infrastructureRating: z.coerce.number().min(1).max(5),
  facultyRating: z.coerce.number().min(1).max(5),
  campusLifeRating: z.coerce.number().min(1).max(5),
  title: z.string().min(5, 'Title must be at least 5 characters'),
  pros: z.string().min(15, 'Pros must be detailed (at least 15 characters)'),
  cons: z.string().min(15, 'Cons must be detailed (at least 15 characters)'),
  adviceToJunior: z.string().optional(),
});
