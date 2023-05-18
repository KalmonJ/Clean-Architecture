import {
  OrderEntity,
  OrderEntityProps,
} from "../../domain/entities/order.entity";
import { IdGeneratorInterface } from "../../domain/interfaces/id-generator.interface";
import { OrderRepository } from "../../domain/repositories/order.repository";

export class CreateOrderUseCase {
  constructor(
    private orderRepo: OrderRepository,
    private idGenerate: IdGeneratorInterface
  ) {}

  async execute(input: InputCreateOrder): Promise<void> {
    const order = new OrderEntity({
      ...input,
    });
    await this.orderRepo.insert(order);
  }
}

type InputCreateOrder = Omit<OrderEntityProps, "id">;
