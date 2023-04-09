import { ProductRepository } from "../../domain/repositories/product.repository";
import { OutputProduct } from "./create-product.use-case";

export class GetRecommendations {
  constructor(private productRepo: ProductRepository) {}

  async execute(input: string): Promise<OutputProduct[]> {
    return (await this.productRepo.getAll())
      .map((product) => product.toJSON())
      .filter((item) => item.category === input);
  }
}
