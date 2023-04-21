import { OutputProduct } from "./create-product.use-case";
import { ProductRepository } from "./../../domain/repositories/product.repository";

export class GetProductUseCase {
  constructor(private productRepo: ProductRepository) {}

  async execute(input: { id: string }): Promise<OutputProduct> {
    const product = await this.productRepo.findById(input.id);
    return product.toJSON();
  }
}
