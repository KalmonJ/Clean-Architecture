import { ProductEntity } from "../domain/entities/product.entity";
import { OutputError } from "../domain/interfaces/error.interface";
import { IdGeneratorInterface } from "../domain/interfaces/id-generator.interface";
import { ProductRepository } from "../domain/repositories/product.repository";

export class CreateProductUseCase {
  constructor(
    private productRepo: ProductRepository,
    private idGenerate: IdGeneratorInterface
  ) {}

  async execute(input: InputProduct): Promise<OutputProduct | OutputError> {
    try {
      const product = new ProductEntity({
        ...input,
        id: this.idGenerate.generate(),
      });
      await this.productRepo.insert(product);
      return product.toJSON();
    } catch (error: any) {
      return { error: error.message };
    }
  }
}

export type InputProduct = {
  name: string;
  image?: string;
  description: string;
  price: number;
};

export type OutputProduct = {
  id: string;
  name: string;
  price: number;
  description: string;
};
