import { CreateOrderUseCase } from "../../application/usecases/create-order.use-case";
import { Request, Response } from "express";
import { StripeAdapter } from "../adapters/stripe";

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

  async createCheckout(req: Request, res: Response) {
    try {
      const stripe = new StripeAdapter();
      const response = await stripe.checkout(req.body);
      return res.status(303).redirect(response as string);
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
}
