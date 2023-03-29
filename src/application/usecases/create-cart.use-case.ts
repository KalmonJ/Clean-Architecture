import { CartEntity } from "../domain/entities/cart.entity";
import { IdGeneratorInterface } from "../domain/interfaces/id-generator.interface";
import { CartRepositoryInterface } from "../domain/repositories/cart.repository";
import { OutputProduct } from "./create-product.use-case";

export class CreateCartUseCase {
  constructor(
    private cartRepo: CartRepositoryInterface,
    private idGenerate: IdGeneratorInterface
  ) {}

  async execute(input: InputCart): Promise<OutputCart> {
    const cart = new CartEntity({ ...input, id: this.idGenerate.generate() });
    await this.cartRepo.insert(cart);
    return cart.toJSON();
  }
}

export type InputCart = {
  items: OutputProduct[];
  totalValue: number;
  quantity: number;
};

export type OutputCart = {
  items: OutputProduct[];
  id: string;
  quantity: number;
  totalValue: number;
};
