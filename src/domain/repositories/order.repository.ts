import { OrderEntity } from "../entities/order.entity";

export interface OrderRepository {
  insert(order: OrderEntity): Promise<void>;
}
