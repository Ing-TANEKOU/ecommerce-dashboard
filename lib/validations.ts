import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(3, 'Nom requis (3 caractères minimum)'),
  description: z.string().optional(),
  price: z.number().positive('Prix doit être positif'),
  stock: z.number().int().nonnegative('Stock doit être positif ou nul'),
  image: z.string().url().optional(),
});

export type ProductInput = z.infer<typeof productSchema>;