import { InputCart } from "../../../application/usecases/create-cart.use-case";
import { CartEntity } from "../../../domain/entities/cart.entity";
import { CartRepository } from "../../../domain/repositories/cart.repository";
import cartModel from "./mongoDB/schemas/cart.model";

export class CartDataBaseRepository implements CartRepository {
  async update(id: string, input: InputCart): Promise<boolean> {
    const response = cartModel.findOneAndUpdate({ id }, input);
    return !!response;
  }
  async insert(cart: CartEntity): Promise<void> {
    const response = new cartModel(cart.toJSON());
    await response.save();
  }
  async getById(input: string): Promise<CartEntity> {
    const response = (await cartModel.find({ id: input })) as any;
    return response[0];
  }
}
