import { IdGenerator } from "../../domain/services/id-generator";
import { UpdateProductUseCase } from "./update-product.use-case";
import { CreateProductUseCase, InputProduct } from "./create-product.use-case";
import { ProductInMemoryRepository } from "../../infra/repositories/memory/product-in-memory-repository";

describe("Update product use case test", () => {
  it("Should update a product", async () => {
    const inputProduct: InputProduct = {
      name: "this is Product",
      description: "any description",
      price: 1000,
    };
    const repository = new ProductInMemoryRepository();
    const idGenerate = new IdGenerator();
    const createProductUseCase = new CreateProductUseCase(
      repository,
      idGenerate
    );
    const product = await createProductUseCase.execute(inputProduct);
    const updateProductuseCase = new UpdateProductUseCase(repository);
    const id = ("id" in product && product.id) || "";
    const updated = await updateProductuseCase.execute(id, {
      name: "this is new name product",
    });

    expect(updated).toBeTruthy();
    expect(repository.products[0].props.name).toBe("this is new name product");
  });
});
