import { InputCart } from "../../application/usecases/create-cart.use-case";
import { CartEntity, CartEntityProps } from "../entities/cart.entity";

export interface CartRepository {
  insert(cart: CartEntity): Promise<void>;
  getById(input: string): Promise<CartOutputDto | null>;
  update(id: string, input: CartEntity): Promise<CartOutputDto | null>;
  findByOwner(owner: string): Promise<CartOutputDto | null>;
}

export interface CartOutputDto extends CartEntityProps {
  _id: string;
}
