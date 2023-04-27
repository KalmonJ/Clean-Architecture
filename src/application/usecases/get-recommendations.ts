import { ProductEntityProps } from "../../domain/entities/product.entity";
import { ProductRepository } from "../../domain/repositories/product.repository";

export class GetRecommendationsUseCase {
  constructor(private productRepo: ProductRepository) {}

  async execute(input: string): Promise<ProductEntityProps[]> {
    const response = await this.productRepo.getAll();
    const products = response
      .map((item) => item.toJSON())
      .filter((product) => product.category === input);
    const recommendations: ProductEntityProps[] = [];

    while (recommendations.length < 3) {
      const randomNumber = Math.floor(Math.random() * products.length);
      recommendations.push(products[randomNumber]);

      getRandom();

      function getRandom() {
        if (recommendations.length === 3) {
          return;
        }
        if (products.length < 3) {
          const randomIndex = Math.floor(Math.random() * response.length);
          if (response[randomIndex].toJSON().category === input) {
            getRandom();
          } else {
            recommendations.push(response[randomIndex].toJSON());
            return;
          }
        }
      }
    }
    return recommendations;
  }
}
