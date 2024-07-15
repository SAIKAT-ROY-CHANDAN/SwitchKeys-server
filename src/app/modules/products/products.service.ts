/* eslint-disable @typescript-eslint/no-explicit-any */
import { TProducts } from "./products.interface"
import { Product } from "./products.model"

const createProductIntoDB = async (payload: TProducts) => {
    const result = await Product.create(payload)
    return result
}

const getProductsFromDB = async (query: any) => {
    const { search, sort, minPrice, maxPrice, page = 1, limit = 10 } = query

    const searchQuery: any = { isDeleted: false };

    if (search) {
        searchQuery.$or = [
            { title: { $regex: search, $options: 'i' } },
            { brand: { $regex: search, $options: 'i' } },
        ]
    }

    if (minPrice || maxPrice) {
        searchQuery.price = {};
        if (minPrice) searchQuery.price.$gte = parseFloat(minPrice);
        if (maxPrice) searchQuery.price.$lte = parseFloat(maxPrice);
    }

    const sortQuery: any = {};
    if (sort) {
        if (sort === "low to high") {
            sortQuery.price = 1;
        } else if (sort === "high to low") {
            sortQuery.price = -1;
        }
    }

    const skip = (page - 1) * limit;
    const totalItems = await Product.countDocuments(searchQuery);
    const totalPages = Math.ceil(totalItems / limit);


    const result = await Product.find(searchQuery)
        .sort(sortQuery)
        .skip(skip)
        .limit(limit)

    return {
        result,
        pagination: {
            totalItems,
            totalPages,
            currentPage: page,
            itemsPerPage: limit,
        },
    }
}

const getSingleProductsFromDB = async (id: string) => {
    const result = await Product.findOne({ _id: id })
    return result
}

const updateProductFromDB = async (id: string, payload: Partial<TProducts>) => {
    const updatedProduct = await Product.findByIdAndUpdate(id, payload, { new: true, runValidators: true });

    if (!updatedProduct) {
        throw new Error('Product not found');
    }

    return updatedProduct;
}

const deleteProductFromDB = async (id: string) => {
    const result = await Product.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true }
    );

    return result
}

export const ProductServices = {
    createProductIntoDB,
    getProductsFromDB,
    getSingleProductsFromDB,
    updateProductFromDB,
    deleteProductFromDB
}