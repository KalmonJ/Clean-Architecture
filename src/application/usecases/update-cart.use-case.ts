import { CartRepository } from "../../domain/repositories/cart.repository";
import { InputCart } from "./create-cart.use-case";

export class UpdateCartUseCase {
  constructor(private cartRepo: CartRepository) {}

  async execute(id: string, input: InputCart): Promise<void> {
    const response = await this.cartRepo.update(id, input);
    if (!response) {
      throw new Error("Cart not found!");
    }
  }
}
