import express, { Router } from "express";
import { ExpressRouterInterface } from "./express-router.interface";
import { CartController } from "../../../controllers/cart.controller";

export class CartsRoutes implements ExpressRouterInterface {
  constructor(private cartController: CartController) {}

  registerRoutes(): Router {
    const router = express.Router();
    router.post("/cart", this.cartController.createCart);
    router.get("/cart/:id", this.cartController.getCart);

    return router;
  }
}
