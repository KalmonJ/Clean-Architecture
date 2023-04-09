import {
  ProductEntity,
  Category,
} from "../../../domain/entities/product.entity";
import { ProductRepository } from "../../../domain/repositories/product.repository";
import productsModel from "./mongoDB/schemas/products.model";

export class ProductDataBaseRepository implements ProductRepository {
  async insert(product: ProductEntity): Promise<void> {
    try {
      const response = new productsModel(product);
      await response.save();
    } catch (error) {
      console.log(error, "erro");
    }
  }
  async findById(id: string): Promise<ProductEntity> {
    return (await productsModel.findOne({ id })) as ProductEntity;
  }
  async update(id: string, input: ProductEntity): Promise<boolean> {
    const updated = productsModel.findOneAndUpdate({ id }, input);
    return !!updated;
  }
  async getAll(): Promise<ProductEntity[]> {
    return await productsModel.find();
  }
  async findByCategory(category: string): Promise<ProductEntity[]> {
    return await productsModel.find({ category });
  }
  async getCategories(): Promise<Category[]> {
    const categories = new Set();
    const response: ProductEntity[] = await productsModel.find();
    response.forEach((item) => {
      categories.add(item.toJSON().category);
    });
    return Array.from(categories) as Category[];
  }
}
