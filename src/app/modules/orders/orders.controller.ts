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

const initiatePayment = catchAsync(async (req: Request, res: Response) => {
    const { firstname, lastname, email, phone, address, orders } = req.body;

    const userInfo = { firstname, lastname, email, phone, address };

    const clientSecret = await OrderServices.createPaymentSession(userInfo, orders);

    res.status(200).json({
        success: true,
        clientSecret,
    });
});

export const verifyPayment = catchAsync(async (req: Request, res: Response) => {
    const { session_id } = req.query;

    if (!session_id || typeof session_id !== 'string') {
        return res.status(400).json({ success: false, message: 'Session ID is missing or invalid.' });
    }

    const result = await OrderServices.verifyPaymentService(session_id);

    if (result.success) {
        return res.status(200).json({
            success: true,
            message: 'Payment was successful and order created.',
        });
    } else {
        return res.status(400).json({
            success: false,
            message: 'Payment failed or was not completed.',
        });
    }
});


export const OrderController = {
    createOrder,
    initiatePayment,
    verifyPayment
}