import { ProductEntityProps } from "../../domain/entities/product.entity";
import { ProductRepository } from "../../domain/repositories/product.repository";
import { WeekProductsStrategyInterface } from "../../infra/strategies/week-products.strategy.interface";

export class GetAllProductsByCategoryUseCase {
  constructor(
    private productRepo: ProductRepository,
    private productStrategy: WeekProductsStrategyInterface
  ) {}

  async execute(
    input: InputGetAllProductsByCategory
  ): Promise<OutputByCategory[]> {
    const response = await this.productRepo.findByCategory(input.category);
    return await Promise.all(
      response.map(async (el) => ({
        ...el.toJSON(),
        isNewProduct: this.productStrategy.compareWith(
          7,
          el.props.creationDate
        ),
      }))
    );
  }
}

export interface OutputByCategory extends ProductEntityProps {
  isNewProduct: boolean;
}

export type InputGetAllProductsByCategory = {
  category: "HEADPHONES" | "SPEAKERS" | "EARPHONES";
};
