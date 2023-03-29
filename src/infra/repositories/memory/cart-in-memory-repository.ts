import { CartEntity } from "../../../domain/entities/cart.entity";
import { CartRepositoryInterface } from "../../../domain/repositories/cart.repository";

export class CartInMemoryRepository implements CartRepositoryInterface {
  carts: CartEntity[] = [];

  async insert(cart: CartEntity): Promise<void> {
    this.carts.push(cart);
  }
}
