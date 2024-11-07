/* eslint-disable @typescript-eslint/no-explicit-any */
import { Stripe } from "stripe";
import { AddToCart } from "../AddToCart/addToCart.model";
import { Product } from "../products/products.model";
import { IUser } from "./orders.interface"
import { UserOrder } from "./orders.model"
const stripe = new Stripe(process.env.STRIPE_SECRECT_KEY as string);

interface Order {
    cartId: string;
    counter: number;
    quantity: number;
    price: number;
    orderCount: number;
    productId: string;
}


const createOrderIntoDB = async (payload: IUser) => {
    const { orders } = payload;

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


const createLineItems = (orders: Record<string, Order>) => {
    return Object.values(orders).map((order: Order) => {
        const totalItems = order.orderCount;

        return {
            price_data: {
                currency: 'usd',
                product_data: {
                    name: `Product ${order.productId}`,
                },
                unit_amount: Math.round(order.price * 100),
            },
            quantity: totalItems,
        };
    });
}


const createPaymentSession = async (userInfo: any, orders: Record<string, Order>) => {
    const lineItems = createLineItems(orders);

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `https://switch-keys.vercel.app/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `https://switch-keys.vercel.app/cancel`,
        // success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`,
        // cancel_url: `http://localhost:5173/cancel`,
        metadata: {
            email: userInfo.email,
            name: `${userInfo.firstname} ${userInfo.lastname}`,
            address: userInfo.address,
        },
    });

    return session;
};


export const verifyPaymentService = async (session_id: string) => {
    try {
        const session = await stripe.checkout.sessions.retrieve(session_id);

        if (session.payment_status === 'paid') {
            return {
                success: true,
            };
        } else {
            return { success: false };
        }

    } catch (error) {
        console.error('Error in verifying payment:', error);
        throw new Error('Error verifying payment');
    }
};



export const OrderServices = {
    createOrderIntoDB,
    createPaymentSession,
    verifyPaymentService
}