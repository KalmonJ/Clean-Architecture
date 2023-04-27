import { ProductEntityProps } from "../../domain/entities/product.entity";
import { ProductRepository } from "../../domain/repositories/product.repository";
import { WeekProductsStrategyInterface } from "../../infra/strategies/week-products.strategy.interface";

export class GetAllProductsOfTheWeekUseCase {
  constructor(
    private productRepo: ProductRepository,
    private productStrategy: WeekProductsStrategyInterface
  ) {}

  async execute(): Promise<ProductEntityProps[]> {
    const response = await this.productRepo.getAll();
    const data = await this.productStrategy.weekProducts(response);
    return data;
  }
}
