import { Product } from "../products/products.model";
import { TAddCart } from "./addToCart.interface"
import { AddToCart } from "./addToCart.model"

const createAddToCartIntoDB = async (payload: TAddCart) => {

    const { productId, orderCount, price } = payload;


    if (!productId) {
        throw new Error("Product ID is required");
    }

    const product = await Product.findById(productId)
    if (!product) {
        throw new Error("Product not found");
    }

    const availableQuantity = product.quantity;

    if (availableQuantity < orderCount) {
        throw new Error("Quantity is insufficient");
    }

    const remainingQuantity = availableQuantity - orderCount;
    const totalPrice = orderCount * price;

    const updatedProduct = await Product.findByIdAndUpdate(productId, {
        quantity: remainingQuantity,
        inStock: remainingQuantity > 0,
    }, { new: true })

    if(!updatedProduct){
        throw new Error('Failed to update product')
    }
    
    const addToCartPayload = {
        ...payload,
        totalPrice,
        quantity: remainingQuantity,
    };

    const result = await AddToCart.create(addToCartPayload);
    return result
}

export const AddCartServices = {
    createAddToCartIntoDB
}
