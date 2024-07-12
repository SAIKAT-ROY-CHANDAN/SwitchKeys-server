import express from 'express'
import validateRequest from "../../middlewares/validateRequest";
import { AddCartController } from './addToCart.controller';
import { addToCartValidation } from './addToCart.validation';


const router = express.Router()


router.post('/',
    validateRequest(addToCartValidation.addToCartValidationSchema),
    AddCartController.createCart
)

router.get('/',
    AddCartController.getCart
)

router.delete('/delete/:id',
    AddCartController.deleteCart
)

export const AddToCartRoutes = router
