import AppError from "../../error/AppError";
import { Product } from "../products/products.model";
import { TAddCart } from "./addToCart.interface"
import { AddToCart } from "./addToCart.model"
import httpStatus from "http-status"

const createAddToCartIntoDB = async (payload: TAddCart) => {
    const { productId, orderCount, price } = payload;


    if (!productId) {
        new AppError(httpStatus.UNAUTHORIZED, "Product ID is required");
    }

    const product = await Product.findById(productId)

    if (!product) {
        throw new Error("Product not found");
    }

    const availableQuantity = product.quantity;

    if (availableQuantity < orderCount) {
        new AppError(httpStatus.INSUFFICIENT_STORAGE, "Quantity is insufficient");
    }

    const remainingQuantity = availableQuantity - orderCount;
    const totalPrice = orderCount * price;

    const updatedProduct = await Product.findByIdAndUpdate(productId, {
        quantity: remainingQuantity,
        inStock: remainingQuantity > 0,
    }, { new: true })

    if (!updatedProduct) {
        new AppError(404, 'Failed to update product')
    }


    const cartItem = await AddToCart.findOne({ productId });

    let result;

    if (cartItem) {
        result = await AddToCart.findOneAndUpdate(
            { productId },
            {
                $inc: { orderCount: 1 },
                $set: {
                    totalPrice: (cartItem.orderCount + 1) * price,
                    quantity: remainingQuantity
                }
            },
            { new: true }
        )

    } else {
        const addToCartPayload = {
            ...payload,
            totalPrice,
            quantity: remainingQuantity,
        };
        result = await AddToCart.create(addToCartPayload);
    }

    return result
}

const getAddToCartFromDB = async () => {
    const result = AddToCart.find()
    return result
}

export const AddCartServices = {
    createAddToCartIntoDB,
    getAddToCartFromDB
}
