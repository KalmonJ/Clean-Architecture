import express, { Router } from "express";
import { ExpressRouterInterface } from "./express-router.interface";
import { ProductController } from "../../../controllers/product.controller";
import { AuthMiddleware } from "../../../middlewares/authMiddleware";

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
      "/products/recommendations/:category",
      new AuthMiddleware().authenticate,
      this.productController.getRecommendations
    );
    router.get("/products/product/:id", this.productController.getProductById);
    router.get(
      "/products-of-the-week",
      this.productController.getAllProductsOfTheWeek
    );
    return router;
  }
}
