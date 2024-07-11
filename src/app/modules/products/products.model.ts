import { TProducts } from './products.interface';
import { model, Schema } from "mongoose";

export const productSchema = new Schema<TProducts>({
    title: {
        type: String,
        required: true,
    },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    brandImg: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, required: true },
    desc: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    isStock: {type: Boolean, default: true}
})

export const Product = model<TProducts>("Product", productSchema)