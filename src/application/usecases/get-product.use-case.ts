import { ProductEntityProps } from "../../domain/entities/product.entity";
import { ProductRepository } from "./../../domain/repositories/product.repository";

export class GetProductUseCase {
  constructor(private productRepo: ProductRepository) {}

  async execute(input: { id: string }): Promise<ProductEntityProps> {
    const product = await this.productRepo.findById(input.id);
    return product.toJSON();
  }
}
