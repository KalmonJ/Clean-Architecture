import { CreateCartUseCase } from "../../application/usecases/create-cart.use-case";
import { Request, Response } from "express";
import { GetCartUseCase } from "../../application/usecases/get-cart.use-case";

export class CartController {
  constructor(
    private createCartUseCase: CreateCartUseCase,
    private getCartUseCase: GetCartUseCase
  ) {
    this.createCart = this.createCart.bind(this);
    this.getCart = this.getCart.bind(this);
  }

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

  async getCart(req: Request, res: Response) {
    try {
      const response = await this.getCartUseCase.execute(req.params.id);
      return res
        .status(201)
        .json({ success: true, message: "success", data: response });
    } catch (error: any) {
      return res.status(404).json({ success: false, message: error.message });
    }
  }
}
