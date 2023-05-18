import {
  ProductEntity,
  ProductEntityProps,
} from "../../domain/entities/product.entity";
import { IdGeneratorInterface } from "../../domain/interfaces/id-generator.interface";
import { ProductRepository } from "../../domain/repositories/product.repository";

export class CreateProductUseCase {
  constructor(
    private productRepo: ProductRepository,
    private idGenerate: IdGeneratorInterface
  ) {}

  async execute(input: ProductEntityProps): Promise<void> {
    try {
      const product = new ProductEntity({
        ...input,
        _id: this.idGenerate.generate(),
      });
      await this.productRepo.insert(product);
    } catch (error: any) {
      console.log(error);
    }
  }
}
