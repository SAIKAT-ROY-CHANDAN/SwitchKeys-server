import { model, Schema } from "mongoose";
import { IUser } from "./orders.interface";

const OrderSchema = new Schema({
    cartId: { type: String, requured: true },
    counter: { type: Number, required: true },
    orderCount: { type: Number, required: true },
    price: { type: Number, required: true },
    productId: { type: String, required: true },
    quantity: { type: Number, required: true },
});

const UserSchema = new Schema<IUser>({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    orders: { type: Map, of: OrderSchema },
});



export const UserOrder = model<IUser>("Order", UserSchema)