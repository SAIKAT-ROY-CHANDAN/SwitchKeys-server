import { Router } from "express";
import { ProductRoutes } from "../modules/products/products.routes";

const router = Router()

const moduleRoutes = [
    {
        path: '/product',
        route: ProductRoutes
    }
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router