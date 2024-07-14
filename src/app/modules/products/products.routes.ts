import express from 'express'
import { ProductController } from './products.controller'
import validateRequest from '../../middlewares/validateRequest'
import { productValidation } from './products.validation'

const router = express.Router()

router.post('/',
    validateRequest(productValidation.productValidationSchema),
    ProductController.createProducts
)

router.get('/',
    ProductController.getProducts
)

router.get('/:id',
    ProductController.getSingleProducts
)

router.post('/:id',
    validateRequest(productValidation.productUpdateValidationSchema),
    ProductController.updateProducts
)


export const ProductRoutes = router