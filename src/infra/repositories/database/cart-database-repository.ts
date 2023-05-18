import {
  CartEntity,
  CartEntityProps,
} from "../../../domain/entities/cart.entity";
import {
  CartOutputDto,
  CartRepository,
} from "../../../domain/repositories/cart.repository";
import cartModel from "./mongoDB/schemas/carts.model";

export class CartDataBaseRepository implements CartRepository {
  async findByOwner(owner: string): Promise<CartOutputDto | null> {
    const response: any = await cartModel.findOne({ owner });
    return response;
  }
  async update(id: string, input: CartEntity): Promise<CartOutputDto | null> {
    const {
      items,
      owner,
      finalPrice,
      shippingValue,
      total,
      totalWithVat,
      vat,
    } = input.toJSON();
    const response: any = await cartModel.findOneAndUpdate(
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
  async getById(input: string): Promise<CartOutputDto | null> {
    const response: any = await cartModel.findOne({ id: input });
    return response;
  }
}
