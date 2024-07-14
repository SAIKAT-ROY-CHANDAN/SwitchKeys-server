import { z } from "zod";

export const orderValidationSchema = z.object({
    cartId: z.string(),
    counter: z.number().positive('Counter must be a positive number'),
    orderCount: z.number().min(1, { message: 'Order count must be at least 1' }),
    price: z.number().min(1, { message: 'Price must be at least 1' }),
    productId: z.string(),
    quantity: z.number().min(1, { message: 'Quantity must be at least 1' }),
});

export const userValidationSchema = z.object({
    body: z.object({
        firstname: z.string(),
        lastname: z.string(),
        email: z.string().email('Invalid email format'),
        phone: z.string(),
        address: z.string(),
        orders: z.record(orderValidationSchema),
    })
});

export const orderValidation = {
    userValidationSchema
}