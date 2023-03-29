import { IdGenerator } from "../domain/services/id-generator";
import { ProductInMemoryRepository } from "../infra/repositories/memory/product-in-memory-repository";
import { CreateProductUseCase, InputProduct } from "./create-product.use-case";

describe("Crate product use case", () => {
  it("Should create a new product", async () => {
    const newProduct: InputProduct = {
      name: "other",
      description: "any",
      price: 123123,
      image: "",
    };
    const repository = new ProductInMemoryRepository();
    const idGenerate = new IdGenerator();
    const useCase = new CreateProductUseCase(repository, idGenerate);
    const product = await useCase.execute(newProduct);
    ("");

    expect(repository.products).toHaveLength(1);
    expect(repository.products[0].props).toStrictEqual(product);
  });

  it("The product should not be saved if I pass a negative price", async () => {
    const newProduct: InputProduct = {
      name: "other",
      description: "any",
      price: -123123,
      image: "",
    };
    const repository = new ProductInMemoryRepository();
    const idGenerate = new IdGenerator();
    const useCase = new CreateProductUseCase(repository, idGenerate);
    const product = await useCase.execute(newProduct);

    expect(repository.products).toHaveLength(0);
    expect(product).toStrictEqual({
      error: "The product value must be greater than or equal to 0",
    });
  });

  it("The product should not be saved if I pass a name too long", async () => {
    const newProduct: InputProduct = {
      name: "woooooooooooooooooowoaaaaaaasssssssssssssssssss",
      description: "any",
      price: 123123,
      image: "",
    };
    const repository = new ProductInMemoryRepository();
    const idGenerate = new IdGenerator();
    const useCase = new CreateProductUseCase(repository, idGenerate);
    const product = await useCase.execute(newProduct);

    expect(repository.products).toHaveLength(0);
    expect(product).toStrictEqual({
      error: "Product name is too long",
    });
  });
});
