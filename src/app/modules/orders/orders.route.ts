import express from 'express'
import { OrderController } from "./orders.controller";
import { orderValidation } from './orders.validaion';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router()

router.get('/verify-payment', OrderController.verifyPayment);

router.post('/delivery',
    validateRequest(orderValidation.userValidationSchema),
    OrderController.createOrder
)

router.post(
    '/initiate-payment',
    validateRequest(orderValidation.userValidationSchema),
    OrderController.initiatePayment
);


export const OrderRoutes = router