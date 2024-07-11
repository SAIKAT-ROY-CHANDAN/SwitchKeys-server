import { z } from "zod";

const productValidationSchema = z.object({
    body: z.object({
        title: z.string(),
        image: z.string(),
        brand: z.string(),
        brandImg: z.string(),
        quantity: z.number(),
        price: z.number(),
        rating: z.number(),
        desc: z.string(),
        isDeleted: z.boolean().optional(),
        isStock: z.boolean().optional()
    })
});

export const productValidation = {
    productValidationSchema
}