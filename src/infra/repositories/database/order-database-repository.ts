import { OrderEntity } from "../../../domain/entities/order.entity";
import { OrderRepository } from "../../../domain/repositories/order.repository";
import ordersModel from "./mongoDB/schemas/orders.model";

export class OrderDataBaseRepository implements OrderRepository {
  async insert(order: OrderEntity): Promise<void> {
    const response = new ordersModel(order.props);
    await response.save();
  }
}
