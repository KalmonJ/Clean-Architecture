import {
  ProductEntity,
  ProductEntityProps,
} from "../../domain/entities/product.entity";
import { ProductRepository } from "../../domain/repositories/product.repository";

export class CreateProductUseCase {
  constructor(private productRepo: ProductRepository) {}

  async execute(input: ProductEntityProps): Promise<void> {
    try {
      const product = new ProductEntity({
        ...input,
      });
      await this.productRepo.insert(product);
    } catch (error: any) {
      console.log(error);
    }
  }
}
