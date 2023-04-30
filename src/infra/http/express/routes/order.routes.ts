import { ExpressRouterInterface } from "./express-router.interface";
import { OrderController } from "../../../controllers/order.controller";
import { Router } from "express";
import express from "express";

export class OrderRoutes implements ExpressRouterInterface {
  constructor(private orderController: OrderController) {}

  registerRoutes(): Router {
    const router = express.Router();
    router
      .post("/order", this.orderController.createOrder)
      .post("/create-checkout", this.orderController.createCheckout);
    return router;
  }
}
