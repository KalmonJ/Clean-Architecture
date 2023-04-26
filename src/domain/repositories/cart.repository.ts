import { CartEntity } from "../entities/cart.entity";

export interface CartRepository {
  insert(cart: CartEntity): Promise<CartEntity>;
  getById(input: string): Promise<CartEntity>;
}
