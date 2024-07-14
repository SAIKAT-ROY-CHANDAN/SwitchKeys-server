import { Request, Response } from "express"
import catchAsync from "../../utils/catchAsync"
import { OrderServices } from "./orders.service"

const createOrder = catchAsync(async (req: Request, res: Response) => {
    const result = await OrderServices.createOrderIntoDB(req.body)

    res.status(200).json({
        success: true,
        message: 'Products added successfully',
        data: result
    })
})


export const OrderController = {
    createOrder
}