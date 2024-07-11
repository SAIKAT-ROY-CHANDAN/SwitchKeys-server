import { Router } from "express";
import { ProductRoutes } from "../modules/products/products.routes";
import { AddToCartRoutes } from "../modules/AddToCart/addToCart.routes";

const router = Router()

const moduleRoutes = [
    {
        path: '/product',
        route: ProductRoutes
    }, 
    {
        path: '/cart',
        route: AddToCartRoutes
    }, 
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router