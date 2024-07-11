import { z } from "zod";

const addToCartValidationSchema = z.object({
    body: z.object({
        productId: z.string(),
        title: z.string(),
        image: z.string(),
        brand: z.string(),
        brandImg: z.string(),
        quantity: z.number(),
        price: z.number(),
        rating: z.number().optional(),
        desc: z.string(),
        orderCount: z.number(),
        inStock: z.boolean().optional(),
        isPurchased: z.boolean().optional(),
        isDeleted: z.boolean().optional()
    })
})

export const addToCartValidation = {
    addToCartValidationSchema
}