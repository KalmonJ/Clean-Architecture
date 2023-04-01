import { ProductRepository } from "../../domain/repositories/product.repository";
import { OutputProduct } from "./create-product.use-case";

export class GetAllProductsOfTheWeekUseCase {
  constructor(private productRepo: ProductRepository) {}

  async execute(): Promise<OutputProduct[]> {
    const response = await this.productRepo.getAll();
    const data = response
      .map((product) => product.toJSON())
      .filter((el) => {
        const todayDate = new Date();
        const toConvert = 1;
        const aDayInHours = 24;
        const hourInMinutes = 60;
        const minuteInSeconds = 60;
        const indicator = 1000;
        const oneDay =
          toConvert * aDayInHours * hourInMinutes * minuteInSeconds * indicator;
        const period = todayDate.getTime() - el.creationDate.getTime();
        const days = Math.floor(period / oneDay);
        return days <= 7;
      });
    return data;
  }
}
