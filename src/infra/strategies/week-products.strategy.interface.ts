import {
  ProductEntity,
  ProductEntityProps,
} from "../../domain/entities/product.entity";

export interface WeekProductsStrategyInterface {
  weekProducts(products: ProductEntity[]): Promise<ProductEntityProps[]>;
  compareWith(input: number, otherDate: Date): boolean;
}
