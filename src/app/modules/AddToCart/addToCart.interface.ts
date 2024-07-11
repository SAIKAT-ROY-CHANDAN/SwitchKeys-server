import { Types } from "mongoose"

export type TAddCart = {
    productId: Types.ObjectId,
    title: string,
    image: string,
    brand: string,
    brandImg: string,
    quantity: number,
    price: number,
    rating: number,
    desc: string,
    isDeleted: boolean,
    isPurchased: boolean
}