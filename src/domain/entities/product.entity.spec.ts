import { ProductEntity, ProductEntityProps } from "./product.entity";

describe("Product entity test", () => {
  it("Product entity constructor", () => {
    const props: ProductEntityProps = {
      id: "any",
      name: "any",
      description: "description",
      price: 3000,
      creationDate: new Date(),
      category: "EARPHONES",
    };
    const product = new ProductEntity(props);
    expect(product.props).toStrictEqual(props);
  });

  it("Product entity update method", () => {
    const props: ProductEntityProps = {
      category: "HEADPHONES",
      id: "any",
      name: "any",
      description: "description",
      price: 3000,
      creationDate: new Date(),
    };
    const product = new ProductEntity(props);
    product.update({ name: "Shoes" });
    expect(product.props.name).toBe("Shoes");
  });
});
