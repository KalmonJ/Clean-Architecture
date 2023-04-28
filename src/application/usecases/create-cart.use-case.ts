import { CartEntity } from "../../domain/entities/cart.entity";
import { ProductEntityProps } from "../../domain/entities/product.entity";
import { IdGeneratorInterface } from "../../domain/interfaces/id-generator.interface";
import { CartRepository } from "../../domain/repositories/cart.repository";
import { GetCartUseCase } from "./get-cart.use-case";
import { UpdateCartUseCase } from "./update-cart.use-case";

export class CreateCartUseCase {
  constructor(
    private cartRepo: CartRepository,
    private idGenerate: IdGeneratorInterface
  ) {}

  async execute(input: InputCart): Promise<void> {
    const getCartUseCase = new GetCartUseCase(this.cartRepo);
    const updateCartUseCase = new UpdateCartUseCase(this.cartRepo);
    const cart = new CartEntity({ ...input, id: this.idGenerate.generate() });
    const response = getCartUseCase.execute(cart.toJSON().id);
    if (!response) {
      await this.cartRepo.insert(cart);
    }
    await updateCartUseCase.execute(cart.toJSON().id, input);
  }
}

export type InputCart = {
  items: ProductEntityProps[];
};
