import z from 'zod';
export const paymentInformationSchema = z.object({
    token: z.string(),
    userId: z.string(),
    amount: z.string()
});

export type zodtype = z.infer<typeof paymentInformationSchema>
