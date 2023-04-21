import express, { Router } from "express";
import { ExpressRouterInterface } from "./express-router.interface";
import { AuthController } from "../../infra/controllers/auth.controller";

export class AuthRoutes implements ExpressRouterInterface {
  constructor(private authController: AuthController) {}

  registerRoutes(): Router {
    const router = express.Router();
    router.post("/auth/login", this.authController.login);
    return router;
  }
}
