import { CreateProductUseCase } from "../../application/usecases/create-product.use-case";
import { GetAllProductsByCategoryUseCase } from "../../application/usecases/get-all-products-by-category.use-case";
import { GetAllProductsOfTheWeekUseCase } from "../../application/usecases/get-all-products-of-the-week.use-case";
import { UpdateProductUseCase } from "../../application/usecases/update-product.use-case";
import { Request, Response } from "express";

export class ProductController {
  constructor(
    private createProductUseCase: CreateProductUseCase,
    private updateProductUseCase: UpdateProductUseCase,
    private getAllProductsByCategoryUseCase: GetAllProductsByCategoryUseCase,
    private getAllProductsOfTheWeekUseCase: GetAllProductsOfTheWeekUseCase
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

  async getAllProductsByCategory(req: Request, res: Response) {
    try {
      const allProductsByCategory =
        await this.getAllProductsByCategoryUseCase.execute({
          category: req.body,
        });

      return res.status(200).json(allProductsByCategory);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async getAllProductsOfTheWeek(_: Request, res: Response) {
    try {
      const productsOfTheWeek =
        await this.getAllProductsOfTheWeekUseCase.execute();

      return res.status(200).json(productsOfTheWeek);
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
