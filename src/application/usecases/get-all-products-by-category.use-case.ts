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
          isDate(el.props.creationDate)
            ? el.props.creationDate
            : new Date(el.props.creationDate)
        ),
      }))
    );
  }
}

export interface OutputByCategory extends ProductEntityProps {
  isNewProduct: boolean;
}

export const isDate = (arg: string | Date): arg is Date => {
  return typeof arg === "object" && !!arg;
};

export type InputGetAllProductsByCategory = {
  category: "HEADPHONES" | "SPEAKERS" | "EARPHONES";
};
