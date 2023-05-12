import { CartEntityProps } from "../../domain/entities/cart.entity";
import { CartRepository } from "../../domain/repositories/cart.repository";
export class GetCartUseCase {
  constructor(private cartRepo: CartRepository) {}

  async execute(input: string): Promise<OutputGetCart> {
    const response = await this.cartRepo.getById(input);
    if (!response) {
      throw new Error("Cart not found!");
    }
    return response as OutputGetCart;
  }
}

type OutputGetCart = Required<CartEntityProps>;
