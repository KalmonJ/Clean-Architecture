import express, { Router } from "express";
import { ExpressRouterInterface } from "./express-router.interface";
import { CartController } from "../../../controllers/cart.controller";

export class CartRoutes implements ExpressRouterInterface {
  constructor(private cartController: CartController) {}

  registerRoutes(): Router {
    const router = express.Router();
    router.post("/cart", this.cartController.createCart);
    router.get("/cart/:id", this.cartController.getCart);
    router.put("/cart/:id", this.cartController.updateCart);

    return router;
  }
}
