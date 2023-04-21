import { OrderEntity } from "../../domain/entities/order.entity";
import { IdGeneratorInterface } from "../../domain/interfaces/id-generator.interface";
import { OrderRepository } from "../../domain/repositories/order.repository";

export class CreateOrderUseCase {
  constructor(
    private orderRepo: OrderRepository,
    private idGenerate: IdGeneratorInterface
  ) {}

  async execute(input: InputOrder): Promise<void> {
    // const order = new OrderEntity({});
    // await this.orderRepo.insert(order);
  }
}

interface InputOrder {}
