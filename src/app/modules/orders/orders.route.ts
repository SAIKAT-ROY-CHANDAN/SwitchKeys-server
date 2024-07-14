import express from 'express'
import { OrderController } from "./orders.controller";
import { orderValidation } from './orders.validaion';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router()

router.post('/delivery',
    validateRequest(orderValidation.userValidationSchema),
    OrderController.createOrder
)

export const OrderRoutes = router