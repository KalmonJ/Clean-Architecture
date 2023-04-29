import { ExpressRouterInterface } from "./express-router.interface";
import { Router } from "express";
import express from "express";
import { OrderController } from "../../../controllers/order.controller";
import { StripeAdapter } from "../../../adapters/stripe";

export class OrderRoutes implements ExpressRouterInterface {
  constructor(private orderController: OrderController) {}

  registerRoutes(): Router {
    const router = express.Router();
    router
      .post("/order", this.orderController.createOrder)
      .post("/create-checkout");
    return router;
  }
}
