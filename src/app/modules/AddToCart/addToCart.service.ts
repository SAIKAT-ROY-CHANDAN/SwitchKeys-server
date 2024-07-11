import { TAddCart } from "./addToCart.interface"
import { AddToCart } from "./addToCart.model"

const createAddToCartIntoDB = async (payload: TAddCart) => {
    const result = await AddToCart.create(payload)
    console.log(result);
    return result
}

export const AddCartServices = {
    createAddToCartIntoDB
}
