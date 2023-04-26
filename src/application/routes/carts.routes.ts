import express, { Router } from "express";
import { ExpressRouterInterface } from "./express-router.interface";

export class CartsRoutes implements ExpressRouterInterface {
  registerRoutes(): Router {
    const router = express.Router();
    router.post("/cart");
    router.get("/cart/:id");
    

    return router;
  }
}
