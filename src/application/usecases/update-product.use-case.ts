import { ProductEntity } from "../../domain/entities/product.entity";
import { OutputError } from "../../domain/interfaces/error.interface";
import { ProductRepository } from "../../domain/repositories/product.repository";

export class UpdateProductUseCase {
  constructor(private productRepo: ProductRepository) {}

  async execute(
    id: string,
    input: InputUpdateProduct
  ): Promise<boolean | OutputError> {
    try {
      const product = await this.productRepo.findById(id);
      product.update(input);
      const updated = await this.productRepo.update(id, product);
      return updated;
    } catch (error: any) {
      return { error: error.message };
    }
  }
}

export type InputUpdateProduct = {
  name?: string;
  price?: number;
  description?: string;
  image?: string;
};
