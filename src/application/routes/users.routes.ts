import express, { Router } from "express";
import { ExpressRouterInterface } from "./express-router.interface";
import { UserController } from "../../infra/controllers/user.controller";

export class UserRoutes implements ExpressRouterInterface {
  constructor(private userController: UserController) {}

  registerRoutes(): Router {
    const router = express.Router();
    router.post("/users", this.userController.createUser);
    router.put("/users/:id", this.userController.updateUser);
    return router;
  }
}
