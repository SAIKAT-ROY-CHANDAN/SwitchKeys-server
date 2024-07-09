import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { ProductServices } from "./products.service";

const createProducts = catchAsync(async (req: Request, res: Response) => {
    const result = await ProductServices.createProductIntoDB(req.body)

    res.status(200).json({
        success: true,
        message: 'Products added successfully',
        data: result
    })
})

const getProducts = catchAsync(async (req: Request, res: Response) => {
    const result = await ProductServices.getProductsFromDB()

    res.status(200).json({
        success: true,
        message: 'Products fetched successfully',
        data: result
    })
})


export const ProductController = {
    createProducts,
    getProducts
}