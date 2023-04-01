import { CreateProductUseCase } from "../../application/usecases/create-product.use-case";
import { UpdateProductUseCase } from "../../application/usecases/update-product.use-case";
import { Request, Response } from "express";

export class UserController {
  constructor(
    private createProductUseCase: CreateProductUseCase,
    private updateProductUseCase: UpdateProductUseCase
  ) {}

  async createProduct(req: Request, res: Response) {
    try {
      const Product = await this.createProductUseCase.execute(req.body);

      if ("error" in Product) {
        throw new Error(Product.error);
      }
      return res.status(201).json(Product);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async updateProduct(req: Request, res: Response) {
    try {
      const updated = await this.updateProductUseCase.execute(
        req.params.id,
        req.body
      );

      return res.status(200).json(updated);
    } catch (error: any) {
      return res.status(400).json(error);
    }
  }
}
