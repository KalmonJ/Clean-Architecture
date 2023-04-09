import { ProductRepository } from "../../domain/repositories/product.repository";
export class ListAllProductsCategoryUseCase {
  constructor(private productRepo: ProductRepository) {}

  async execute(): Promise<string[]> {
    const response = await this.productRepo.getCategories();
    return response;
  }
}
