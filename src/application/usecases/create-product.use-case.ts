import { ProductEntity } from "../../domain/entities/product.entity";
import { IdGeneratorInterface } from "../../domain/interfaces/id-generator.interface";
import { ProductRepository } from "../../domain/repositories/product.repository";

export class CreateProductUseCase {
  constructor(
    private productRepo: ProductRepository,
    private idGenerate: IdGeneratorInterface
  ) {}

  async execute(input: InputProduct): Promise<void> {
    try {
      const product = new ProductEntity({
        ...input,
        id: this.idGenerate.generate(),
      });
      await this.productRepo.insert(product);
    } catch (error: any) {
      console.log(error);
    }
  }
}

export type InputProduct = {
  name: string;
  images?: {
    thumbnail: string;
    presentation: string[];
  };
  description: string;
  price: number;
  creationDate: Date;
  features: string;
  inTheBox: InTheBox[];
  category: "HEADPHONES" | "SPEAKERS" | "EARPHONES";
};

export type InTheBox = {
  name: string;
  quantity: 1;
};

export type OutputProduct = {
  id: string;
  name: string;
  image?: string;
  description: string;
  price: number;
  creationDate: Date;
  category: "HEADPHONES" | "SPEAKERS" | "EARPHONES";
};
