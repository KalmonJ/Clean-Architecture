import { CreateCartUseCase } from "../../application/usecases/create-cart.use-case";
import { Request, Response } from "express";

export class CartController {
  constructor(private createCartUseCase: CreateCartUseCase) {}

  async createCart(req: Request, res: Response) {
    try {
      await this.createCartUseCase.execute(req.body);
      return res
        .status(201)
        .json({ success: true, message: "Cart successfuly created!" });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
}
