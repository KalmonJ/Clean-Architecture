import { ProductRepository } from "../../domain/repositories/product.repository";

export class UpdateProductUseCase {
  constructor(private productRepo: ProductRepository) {}

  async execute(id: string, input: InputUpdateProduct): Promise<boolean> {
    try {
      const product = await this.productRepo.findById(id);
      product.update(input);
      const updated = await this.productRepo.update(id, product);
      return updated;
    } catch (error: any) {
      return false;
    }
  }
}

export type InputUpdateProduct = {
  name?: string;
  price?: number;
  description?: string;
  image?: string;
};
