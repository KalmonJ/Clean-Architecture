import express, { Router } from "express";
import { ExpressRouterInterface } from "./express-router.interface";
import { ProductController } from "../../infra/controllers/product.controller";

export class ProductRoutes implements ExpressRouterInterface {
  constructor(private productController: ProductController) {}

  registerRoutes(): Router {
    const router = express.Router();
    router.post("/products", this.productController.createProduct);
    router.put("/products/:id", this.productController.updateProduct);
    router.get(
      "/products/:category",
      this.productController.getAllProductsByCategory
    );
    router.get(
      "/products-of-the-week",
      this.productController.getAllProductsOfTheWeek
    );
    return router;
  }
}
