import { Request, Response } from "express"
import catchAsync from "../../utils/catchAsync"
import { AddCartServices } from "./addToCart.service"

const createCart = catchAsync(async (req: Request, res: Response) => {
    const result = await AddCartServices.createAddToCartIntoDB(req.body)

    res.status(200).json({
        success: true,
        message: 'Created Cart successfully',
        data: result
    })
})

const getCart = catchAsync(async (req: Request, res: Response) => {
    const result = await AddCartServices.getAddToCartFromDB()

    res.status(200).json({
        success: true,
        message: 'Carts Fetched successfully',
        data: result
    })
})


export const AddCartController = {
    createCart,
    getCart
}