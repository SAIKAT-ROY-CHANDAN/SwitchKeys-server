/* eslint-disable @typescript-eslint/no-explicit-any */
import { AddToCart } from "../AddToCart/addToCart.model";
import { Product } from "../products/products.model";
import { IUser } from "./orders.interface"
import { UserOrder } from "./orders.model"

const createOrderIntoDB = async (payload: IUser) => {
    const { orders} = payload;

    const results = [];

    for (const orderId of Object.keys(orders)) {
        const order = orders[orderId];

        try {
            const addToCartItem = await AddToCart.findOne({ _id: order.cartId });

            if (!addToCartItem) {
                throw new Error(`Cart with cartId ${order.cartId} not found in AddToCart collection.`);
            }

            const product = await Product.findById(order.productId);
            if (!product) {
                throw new Error(`Product with productId ${order.productId} not found in Product collection.`);
            }

            await AddToCart.findOneAndUpdate({ _id: order.cartId }, { $set: { isPurchased: true } });

            const newQuantity = product.quantity - order.orderCount;

            if (newQuantity < 0) {
                throw new Error(`Insufficient quantity in stock for productId ${order.productId}.`);
            }

            await Product.findByIdAndUpdate(order.productId, { quantity: newQuantity });

            const result = await UserOrder.create(payload);

            results.push(result); 

        } catch (error: any) {
            console.error(`Error processing order ${orderId}:`, error.message);
        }
    }
    return results

}

export const OrderServices = {
    createOrderIntoDB
}