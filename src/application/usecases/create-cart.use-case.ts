import { CartEntity } from "../../domain/entities/cart.entity";
import { IdGeneratorInterface } from "../../domain/interfaces/id-generator.interface";
import { CartRepository } from "../../domain/repositories/cart.repository";
import { OutputProduct } from "./create-product.use-case";

export class CreateCartUseCase {
  constructor(
    private cartRepo: CartRepository,
    private idGenerate: IdGeneratorInterface
  ) {}

  async execute(input: InputCart): Promise<void> {
    const cart = new CartEntity({ ...input, id: this.idGenerate.generate() });
    await this.cartRepo.insert(cart);
  }
}

export type InputCart = {
  items: OutputProduct[];
};
