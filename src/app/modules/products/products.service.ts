/* eslint-disable @typescript-eslint/no-explicit-any */
import { TProducts } from "./products.interface"
import { Product } from "./products.model"

const createProductIntoDB = async (payload: TProducts) => {
    const result = await Product.create(payload)
    return result
}

const getProductsFromDB = async (query: any) => {
    const { search, sort } = query

    const searchQuery: any = {};
    console.log(searchQuery);
    if (search) {
        searchQuery.$or = [
            { title: { $regex: search, $options: 'i' } },
            { brand: { $regex: search, $options: 'i' } },
        ]
    }

    const sortQuery: any = {};
    if (sort) {
        if (sort === "low to high") {
            sortQuery.price = 1; 
        } else if (sort === "high to low") {
            sortQuery.price = -1; 
        }
    }


    const result = await Product.find(searchQuery).sort(sortQuery)
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