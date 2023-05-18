import { CartEntity } from "../../domain/entities/cart.entity";
import { ProductEntityProps } from "../../domain/entities/product.entity";
import { IdGeneratorInterface } from "../../domain/interfaces/id-generator.interface";
import { CartRepository } from "../../domain/repositories/cart.repository";

export class CreateCartUseCase {
  constructor(
    private cartRepo: CartRepository,
    private idGenerate: IdGeneratorInterface
  ) {}

  async execute(input: InputCart): Promise<void> {
    const cart = new CartEntity({ ...input });

    console.log(cart, "carrinho");

    await this.cartRepo.insert(cart);
  }
}

export type InputCart = {
  items: ProductEntityProps[];
  owner: string;
};
