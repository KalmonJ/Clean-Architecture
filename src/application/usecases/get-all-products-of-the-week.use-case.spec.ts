import { IdGenerator } from "../../domain/services/id-generator";
import { ProductInMemoryRepository } from "../../infra/repositories/memory/product-in-memory-repository";
import { WeekProductsStrategy } from "../../infra/strategies/week-products.strategy";
import { CreateProductUseCase, InputProduct } from "./create-product.use-case";
import { GetAllProductsOfTheWeekUseCase } from "./get-all-products-of-the-week.use-case";

describe("GetAllProductsOfTheWeek use case test", () => {
  it("Should return products of the week", async () => {
    const oldProduct: InputProduct = {
      name: "anyProduct",
      description: "anyDescription",
      creationDate: new Date("2021-03-25"),
      price: 2000,
      category: "EARPHONES",
    };
    const newProduct: InputProduct = {
      name: "anyProduct",
      description: "anyDescription",
      creationDate: new Date(),
      price: 2000,
      category: "HEADPHONES",
    };
    const productRepo = new ProductInMemoryRepository();
    const identifier = new IdGenerator();
    const productStrategy = new WeekProductsStrategy();
    const createProductUseCase = new CreateProductUseCase(
      productRepo,
      identifier
    );

    await createProductUseCase.execute(oldProduct);
    await createProductUseCase.execute(newProduct);

    const allProductsUseCase = new GetAllProductsOfTheWeekUseCase(
      productRepo,
      productStrategy
    );

    const allWeekProducts = await allProductsUseCase.execute();

    expect(allWeekProducts.length).toBe(1);
  });
});
