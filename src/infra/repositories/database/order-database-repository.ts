import { OrderEntity } from "../../../domain/entities/order.entity";
import { OrderRepository } from "../../../domain/repositories/order.repository";
import orderModel from "./mongoDB/schemas/order.model";

export class OrderDataBaseRepository implements OrderRepository {
  async insert(order: OrderEntity): Promise<void> {
    const response = new orderModel(order.props);
    await response.save();
  }
}
