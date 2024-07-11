import { model, Schema } from "mongoose"
import { TAddCart } from "./addToCart.interface"

export const addToCartSchema = new Schema<TAddCart>({
    productId: { type: Schema.Types.ObjectId, required: true, ref: "Product" },
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
    totalPrice: { type: Number },
    orderCount: { type: Number, required: true },
    inStock: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    isPurchased: { type: Boolean, default: false }
})

export const AddToCart = model<TAddCart>("Cart", addToCartSchema)