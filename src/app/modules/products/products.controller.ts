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
    const result = await ProductServices.getProductsFromDB(req.query)

    res.status(200).json({
        success: true,
        message: 'Products fetched successfully',
        data: result.result,
        pagination: result.pagination
    })
})

const getSingleProducts = catchAsync(async (req: Request, res: Response) => {
    const result = await ProductServices.getSingleProductsFromDB(req.params.id)

    res.status(200).json({
        success: true,
        message: 'Products fetched successfully',
        data: result
    })
})

const updateProducts = catchAsync(async (req: Request, res: Response) => {
    const result = await ProductServices.updateProductFromDB(req.params.id, req.body)

    res.status(200).json({
        success: true,
        message: 'Products updated successfully',
        data: result
    })
})

const deleteProducts = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    await ProductServices.deleteProductFromDB(id)

    res.status(200).json({
        success: true,
        message: 'Products deleted successfully',
    })
})


export const ProductController = {
    createProducts,
    getProducts,
    getSingleProducts,
    updateProducts,
    deleteProducts
}