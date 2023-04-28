import {
  ProductEntity,
  ProductEntityProps,
} from "../../domain/entities/product.entity";
import { WeekProductsStrategyInterface } from "./week-products.strategy.interface";

export class WeekProductsStrategy implements WeekProductsStrategyInterface {
  compareWith(input: number, otherDate: Date): boolean {
    const todayDate = new Date();
    const toConvert = 1;
    const aDayInHours = 24;
    const hourInMinutes = 60;
    const minuteInSeconds = 60;
    const indicator = 1000;
    const oneDay =
      toConvert * aDayInHours * hourInMinutes * minuteInSeconds * indicator;
    const period = todayDate.getTime() - otherDate.getTime();
    const days = Math.floor(period / oneDay);
    return days <= input;
  }

  async weekProducts(products: ProductEntity[]): Promise<ProductEntityProps[]> {
    const data = products
      .map((product) => product.toJSON())
      .filter((el) => this.compareWith(7 * 4, el.creationDate));
    return data;
  }
}
