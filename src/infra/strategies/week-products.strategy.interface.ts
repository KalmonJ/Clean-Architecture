import { OutputProduct } from "../../application/usecases/create-product.use-case";
import { ProductEntity } from "../../domain/entities/product.entity";

export interface WeekProductsStrategyInterface {
  weekProducts(products: ProductEntity[]): Promise<OutputProduct[]>;
  compareWith(input: number, otherDate: Date): boolean;
}
