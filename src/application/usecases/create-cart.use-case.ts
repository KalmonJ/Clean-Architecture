import { CartEntity } from "../../domain/entities/cart.entity";
import { ProductEntityProps } from "../../domain/entities/product.entity";
import { CartRepository } from "../../domain/repositories/cart.repository";

export class CreateCartUseCase {
  constructor(private cartRepo: CartRepository) {}

  async execute(input: InputCart): Promise<void> {
    const cart = new CartEntity({ ...input });
    await this.cartRepo.insert(cart);
  }
}

export type InputCart = {
  items: ProductEntityProps[];
  owner: string;
};
