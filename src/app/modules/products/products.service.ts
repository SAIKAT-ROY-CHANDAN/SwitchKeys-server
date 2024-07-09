import { TProducts } from "./products.interface"
import { Product } from "./products.model"

const createProductIntoDB = async (payload: TProducts) => {
    const result = await Product.create(payload)
    return result
}

const getProductsFromDB = async () => {
    const result = await Product.find()
    return result
}

const getSingleProductsFromDB = async (id: string) => {
    const result = await Product.findOne({ _id: id })
    return result
}

export const ProductServices = {
    createProductIntoDB,
    getProductsFromDB,
    getSingleProductsFromDB
}