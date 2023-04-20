import { CreateProductUseCase } from "../../application/usecases/create-product.use-case";
import { GetAllProductsByCategoryUseCase } from "../../application/usecases/get-all-products-by-category.use-case";
import { GetAllProductsOfTheWeekUseCase } from "../../application/usecases/get-all-products-of-the-week.use-case";
import { UpdateProductUseCase } from "../../application/usecases/update-product.use-case";
import { Request, Response } from "express";
import { Category } from "../../domain/entities/product.entity";
import { ProductRepository } from "../../domain/repositories/product.repository";
import { ProductDataBaseRepository } from "../repositories/database/product-database-repository";
import { GetRecommendationsUseCase } from "../../application/usecases/get-recommendations";

export class ProductController {
  constructor(
    private createProductUseCase: CreateProductUseCase,
    private updateProductUseCase: UpdateProductUseCase,
    private getAllProductsByCategoryUseCase: GetAllProductsByCategoryUseCase,
    private getAllProductsOfTheWeekUseCase: GetAllProductsOfTheWeekUseCase,
    private getRecommendationsUseCase: GetRecommendationsUseCase
  ) {
    this.createProduct = this.createProduct.bind(this);
    this.getAllProductsByCategory = this.getAllProductsByCategory.bind(this);
    this.getAllProductsOfTheWeek = this.getAllProductsOfTheWeek.bind(this);
    this.updateProduct = this.getAllProductsOfTheWeek.bind(this);
    this.getRecommendations = this.getRecommendations.bind(this);
  }

  async createProduct(req: Request, res: Response) {
    try {
      const product = await this.createProductUseCase.execute(req.body);

      return res.status(201).json(product);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async getAllProductsByCategory(req: Request, res: Response) {
    try {
      const allProductsByCategory =
        await this.getAllProductsByCategoryUseCase.execute({
          category: req.params.category as Category,
        });

      return res.status(200).json(allProductsByCategory);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async getProductById(req: Request, res: Response) {
    try {
      const productRepo = new ProductDataBaseRepository();
      const product = await productRepo.findById(req.params.id);

      console.log(product, "produtooo");
      return res.status(200).json(product);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async getRecommendations(req: Request, res: Response) {
    console.log(req.params);
    try {
      const recommendations = await this.getRecommendationsUseCase.execute(
        req.params.category
      );

      console.log(recommendations, "recommendationnnnn");

      return res.status(200).json(recommendations);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async getAllProductsOfTheWeek(req: Request, res: Response) {
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
