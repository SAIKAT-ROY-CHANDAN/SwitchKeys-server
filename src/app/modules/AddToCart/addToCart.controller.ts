import { Request, Response } from "express"
import catchAsync from "../../utils/catchAsync"
import { AddCartServices } from "./addToCart.service"

const createCart = catchAsync(async (req: Request, res: Response) => {
    const result = await AddCartServices.createAddToCartIntoDB(req.body)
console.log(result);
    res.status(200).json({
        success: true,
        message: 'Created Cart successfully',
        data: result
    })
})

export const AddCartController = {
    createCart
}