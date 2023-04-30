import { CartEntity } from "../../domain/entities/cart.entity";
import { ProductEntityProps } from "../../domain/entities/product.entity";
import { IdGeneratorInterface } from "../../domain/interfaces/id-generator.interface";
import { CartRepository } from "../../domain/repositories/cart.repository";

export class CreateCartUseCase {
  constructor(
    private cartRepo: CartRepository,
    private idGenerate: IdGeneratorInterface
  ) {}

  async execute(input: InputCart): Promise<void> {
    const cart = new CartEntity({ ...input, id: this.idGenerate.generate() });
    const response = await this.cartRepo.getById(cart.toJSON().id);
    if (!response) {
      await this.cartRepo.insert(cart);
    }
    await this.cartRepo.update(response.toJSON().id, cart.toJSON());
  }
}

export type InputCart = {
  items: ProductEntityProps[];
};
