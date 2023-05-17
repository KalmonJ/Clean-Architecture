import { CartEntity } from "../../domain/entities/cart.entity";
import { CartRepository } from "../../domain/repositories/cart.repository";
import { InputCart } from "./create-cart.use-case";

export class UpdateCartUseCase {
  constructor(private cartRepo: CartRepository) {}

  async execute(id: string, input: InputCart): Promise<void> {
    const cart = new CartEntity({ id, items: input.items, owner: input.owner });

    console.log(cart, "carrt");

    const response = await this.cartRepo.update(id, cart);
    if (!response) {
      throw new Error("Cart not found!");
    }
  }
}
