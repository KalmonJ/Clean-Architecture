import { ProductRepository } from "../../domain/repositories/product.repository";
import { OutputProduct } from "./create-product.use-case";

export class GetAllProductsByCategoryUseCase {
  constructor(private productRepo: ProductRepository) {}

  async execute(
    input: InputGetAllProductsByCategory
  ): Promise<OutputProduct[]> {
    const response = await this.productRepo.findByCategory(input.category);
    return response.map((el) => el.toJSON());
  }
}

export type InputGetAllProductsByCategory = {
  category: "HEADPHONES" | "SPEAKERS" | "EARPHONES";
};
