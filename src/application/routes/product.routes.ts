import express, { Request, Router, Response } from "express";
import { ExpressRouterInterface } from "../../domain/interfaces/express-router.interface";
import { UpdateProductUseCase } from "../update-product.use-case";
import { CreateProductUseCase } from "./../create-product.use-case";

export class ProductRoutes implements ExpressRouterInterface {
  constructor(
    private createProduct: CreateProductUseCase,
    private updateProduct: UpdateProductUseCase
  ) {}

  registerRoutes(): Router {
    const router = express.Router();
    router.post("/product", async (req: Request, res: Response) => {
      try {
        const product = await this.createProduct.execute(req.body);
        return res.status(201).json(product);
      } catch (error) {
        return res.status(400).json(error);
      }
    });

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
