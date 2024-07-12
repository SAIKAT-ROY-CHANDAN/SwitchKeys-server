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

    if (availableQuantity < orderCount && availableQuantity === 0) {
        new AppError(httpStatus.INSUFFICIENT_STORAGE, "Quantity is insufficient");
    }

    const remainingQuantity = availableQuantity - orderCount;
    const totalPrice = orderCount * price;

    const updatedProduct = await Product.findByIdAndUpdate(productId, {
        quantity: remainingQuantity,
        inStock: remainingQuantity > 0,
    }, { new: true })

    if (!updatedProduct) {
        new AppError(httpStatus.NO_CONTENT, 'Failed to update product')
    }

    const addToCartPayload = {
        ...payload,
        totalPrice,
        quantity: remainingQuantity,
    };

    const result = await AddToCart.create(addToCartPayload);
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
