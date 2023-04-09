import { Category, ProductEntity } from "../entities/product.entity";

export interface ProductRepository {
  insert(product: ProductEntity): Promise<void>;
  findById(id: string): Promise<ProductEntity>;
  update(id: string, input: ProductEntity): Promise<boolean>;
  getAll(): Promise<ProductEntity[]>;
  findByCategory(category: string): Promise<ProductEntity[]>;
  getCategories(): Promise<Category[]>;
}
