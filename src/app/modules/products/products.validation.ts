import { z } from "zod";

const productValidationSchema = z.object({
    body: z.object({
        title: z.string(),
        image: z.string(),
        brand: z.string(),
        brandImg: z.string(),
        quantity: z.number(),
        price: z.number(),
        rating: z.number().optional(),
        desc: z.string(),
        isDeleted: z.boolean().optional(),
        inStock: z.boolean().optional()
    })
});

const productUpdateValidationSchema = z.object({
    body: z.object({
        title: z.string().optional(),
        image: z.string().optional(),
        brand: z.string().optional(),
        brandImg: z.string().optional(),
        quantity: z.number().optional(),
        price: z.number().optional(),
        rating: z.number().optional(),
        desc: z.string().optional(),
        isDeleted: z.boolean().optional(),
        inStock: z.boolean().optional()
    })
});

export const productValidation = {
    productValidationSchema,
    productUpdateValidationSchema
}