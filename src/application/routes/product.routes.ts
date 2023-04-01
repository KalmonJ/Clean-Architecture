import express, { Request, Router, Response } from "express";
import { ExpressRouterInterface } from "./express-router.interface";
import { CreateProductUseCase } from "../usecases/create-product.use-case";
import { UpdateProductUseCase } from "../usecases/update-product.use-case";

export class ProductRoutes implements ExpressRouterInterface {
  constructor(
    private createProduct: CreateProductUseCase,
    private updateProduct: UpdateProductUseCase
  ) {}

  registerRoutes(): Router {
    const router = express.Router();
    router.post("/product");

    router.put("/product/:id", async (req: Request, res: Response) => {
      try {
        const updated = this.updateProduct.execute(req.params.id, req.body);
        return res.status(201).json(updated);
      } catch (error) {
        return res.status(400).json(error);
      }
    });

    return router;
  }
}
