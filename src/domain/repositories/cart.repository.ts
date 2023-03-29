import { InputCart } from "../../application/create-cart.use-case";
import { CartEntity } from "../entities/cart.entity";

export interface CartRepositoryInterface {
  insert(cart: CartEntity): Promise<void>;
}
