import { IdGenerator } from "../../domain/services/id-generator";
import { CartInMemoryRepository } from "../../infra/repositories/memory/cart-in-memory-repository";
import { CreateCartUseCase, InputCart } from "./create-cart.use-case";

describe("Create cart use case test", () => {
  it("Should create new cart", async () => {
    const idGenerete = new IdGenerator();

    const items = [
      {
        name: "product name",
        id: idGenerete.generate(),
        description: "description",
        price: 2000,
      },
    ];

    const cart: InputCart = {
      items,
      totalValue: 222,
      quantity: items.length,
    };

    const cartRepository = new CartInMemoryRepository();

    const createCartUseCase = new CreateCartUseCase(cartRepository, idGenerete);
    const outputCart = await createCartUseCase.execute(cart);

    expect(outputCart).toStrictEqual({
      ...cart,
      id: cartRepository.carts[0].props.id,
    });
  });
});
