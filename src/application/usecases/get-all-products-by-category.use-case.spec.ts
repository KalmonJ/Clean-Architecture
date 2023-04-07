import { IdGenerator } from "../../domain/services/id-generator";
import { ProductInMemoryRepository } from "../../infra/repositories/memory/product-in-memory-repository";
import { WeekProductsStrategy } from "../../infra/strategies/week-products.strategy";
import { CreateProductUseCase } from "./create-product.use-case";
import { GetAllProductsByCategoryUseCase } from "./get-all-products-by-category.use-case";

describe("GetAllProductsByCategory use case test", () => {
  it("Should return products filtered by category", async () => {
    const productRepo = new ProductInMemoryRepository();
    const idGenerate = new IdGenerator();
    const productStrategy = new WeekProductsStrategy();
    const createProductUseCase = new CreateProductUseCase(
      productRepo,
      idGenerate
    );

    await createProductUseCase.execute({
      category: "SPEAKERS",
      creationDate: new Date(),
      price: 34234,
      name: "anyName",
      description: "description",
    });

    await createProductUseCase.execute({
      category: "HEADPHONES",
      creationDate: new Date(),
      price: 34234,
      name: "anyName",
      description: "description",
    });

    const productsUseCase = new GetAllProductsByCategoryUseCase(
      productRepo,
      productStrategy
    );
    const filteredProducts = await productsUseCase.execute({
      category: "HEADPHONES",
    });

    expect(filteredProducts).toHaveLength(1);
    expect(filteredProducts[0].category).toBe("HEADPHONES");
    expect(filteredProducts[0].isNewProduct).toBeTruthy();
  });
});
