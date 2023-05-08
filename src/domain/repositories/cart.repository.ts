import { InputCart } from "../../application/usecases/create-cart.use-case";
import { CartEntity } from "../entities/cart.entity";

export interface CartRepository {
  insert(cart: CartEntity): Promise<void>;
  getById(input: string): Promise<CartEntity>;
  update(id: string, input: CartEntity): Promise<any>;
  findByOwner(owner: string): Promise<any>;
}
