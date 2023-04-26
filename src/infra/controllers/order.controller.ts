import { CreateOrderUseCase } from "../../application/usecases/create-order.use-case";
import { Request, Response } from "express";

export class OrderController {
  constructor(private createOrderUseCase: CreateOrderUseCase) {}

  async createOrder(req: Request, res: Response) {
    try {
      await this.createOrderUseCase.execute(req.body);
      return res
        .status(201)
        .json({ success: true, message: "Order create successfuly!" });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
}
