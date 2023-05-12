import { InputCart } from "../../../application/usecases/create-cart.use-case";
import {
  CartEntity,
  CartEntityProps,
} from "../../../domain/entities/cart.entity";
import { CartRepository } from "../../../domain/repositories/cart.repository";
import cartModel from "./mongoDB/schemas/carts.model";

export class CartDataBaseRepository implements CartRepository {
  async findByOwner(owner: string): Promise<CartEntityProps | null> {
    const response = await cartModel.findOne({ owner });
    return response;
  }
  async update(id: string, input: CartEntity): Promise<CartEntityProps | null> {
    const {
      items,
      owner,
      finalPrice,
      shippingValue,
      total,
      totalWithVat,
      vat,
    } = input.toJSON();
    const response = await cartModel.findOneAndUpdate(
      { id },
      {
        $set: {
          items,
          owner,
          shippingValue,
          totalWithVat,
          vat,
          total,
          finalPrice,
        },
      },
      {
        new: true,
      }
    );
    return response;
  }
  async insert(cart: CartEntity): Promise<void> {
    const response = new cartModel(cart.toJSON());
    await response.save();
  }
  async getById(input: string): Promise<CartEntityProps | null> {
    const response = await cartModel.findOne({ id: input });
    return response;
  }
}
