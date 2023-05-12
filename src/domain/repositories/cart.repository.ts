import { InputCart } from "../../application/usecases/create-cart.use-case";
import { CartEntity, CartEntityProps } from "../entities/cart.entity";

export interface CartRepository {
  insert(cart: CartEntity): Promise<void>;
  getById(input: string): Promise<CartEntityProps | null>;
  update(id: string, input: CartEntity): Promise<CartEntityProps | null>;
  findByOwner(owner: string): Promise<CartEntityProps | null>;
}
