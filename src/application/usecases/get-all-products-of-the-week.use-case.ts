import { ProductRepository } from "../../domain/repositories/product.repository";
import { WeekProductsStrategyInterface } from "../../infra/strategies/week-products.strategy.interface";
import { OutputProduct } from "./create-product.use-case";

export class GetAllProductsOfTheWeekUseCase {
  constructor(
    private productRepo: ProductRepository,
    private productStrategy: WeekProductsStrategyInterface
  ) {}

  async execute(): Promise<OutputProduct[]> {
    const response = await this.productRepo.getAll();
    const data = await this.productStrategy.weekProducts(response);
    return data;
  }
}
