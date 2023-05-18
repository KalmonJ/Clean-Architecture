import {
  OrderEntity,
  OrderEntityProps,
} from "../../domain/entities/order.entity";
import { OrderRepository } from "../../domain/repositories/order.repository";

export class CreateOrderUseCase {
  constructor(private orderRepo: OrderRepository) {}

  async execute(input: InputCreateOrder): Promise<void> {
    const order = new OrderEntity({
      ...input,
    });
    await this.orderRepo.insert(order);
  }
}

type InputCreateOrder = Omit<OrderEntityProps, "id">;
