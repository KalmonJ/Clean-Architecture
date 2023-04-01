import { ProductEntity } from "../../../domain/entities/product.entity";
import { ProductRepository } from "../../../domain/repositories/product.repository";

export class ProductInMemoryRepository implements ProductRepository {
  products: ProductEntity[] = [];
  async findById(id: string): Promise<ProductEntity> {
    const product = this.products.find((products) => products.props.id === id);
    if (!product) throw new Error("Product not found");
    return product;
  }
  async update(id: string, input: ProductEntity): Promise<boolean> {
    const index = this.products.findIndex((product) => product.props.id === id);
    if (index >= 0) {
      this.products[index] = input;
      return true;
    }
    return false;
  }
  async insert(product: ProductEntity): Promise<void> {
    this.products.push(product);
  }
  async getAll(): Promise<ProductEntity[]> {
    return this.products;
  }
}
