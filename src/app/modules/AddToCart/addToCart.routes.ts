import express from 'express'
import validateRequest from "../../middlewares/validateRequest";
import { addToCartValidation } from './addToCart.Validation';
import { AddCartController } from './addToCart.controller';


const router = express.Router()


router.post('/',
    validateRequest(addToCartValidation.addToCartValidationSchema),
    AddCartController.createCart
)

export const AddToCartRoutes = router
