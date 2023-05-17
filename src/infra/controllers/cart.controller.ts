import { CreateCartUseCase } from "../../application/usecases/create-cart.use-case";
import { Request, Response } from "express";
import { GetCartUseCase } from "../../application/usecases/get-cart.use-case";
import { UpdateCartUseCase } from "../../application/usecases/update-cart.use-case";

export class CartController {
  constructor(
    private createCartUseCase: CreateCartUseCase,
    private getCartUseCase: GetCartUseCase,
    private updateCartUseCase: UpdateCartUseCase
  ) {
    this.createCart = this.createCart.bind(this);
    this.getCart = this.getCart.bind(this);
    this.updateCart = this.updateCart.bind(this);
  }

  async createCart(req: Request, res: Response) {
    try {
      const response = await this.createCartUseCase.execute(req.body);
      return res.status(201).json(response);
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
  async updateCart(req: Request, res: Response) {
    try {
      const response = await this.updateCartUseCase.execute(req.params.id, {
        items: req.body,
        owner: req.params.id,
      });
      return res
        .status(201)
        .json({ success: true, message: "success", data: response });
    } catch (error: any) {
      console.log(error, "erro");

      return res.status(404).json({ success: false, message: error.message });
    }
  }
}
