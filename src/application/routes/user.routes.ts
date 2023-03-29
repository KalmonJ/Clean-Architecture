import express, { Request, Response, Router } from "express";
import { ExpressRouterInterface } from "../../domain/interfaces/express-router.interface";
import { CreateUserUseCase } from "../usecases/create-user.use-case";
import { UpdateUserUseCase } from "../usecases/update-user.use-case";

export class UserRoutes implements ExpressRouterInterface {
  constructor(
    private createUser: CreateUserUseCase,
    private updateUser: UpdateUserUseCase
  ) {}

  registerRoutes(): Router {
    const router = express.Router();

    router.post("/users", async (req: Request, res: Response) => {
      try {
        const user = await this.createUser.execute(req.body);

        if ("error" in user) {
          throw new Error(user.error);
        }
        return res.status(201).json(user);
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }
    });

    router.put("/users/:id", async (req: Request, res: Response) => {
      try {
        const updated = await this.updateUser.execute(req.params.id, req.body);
        return res.status(201).json(updated);
      } catch (error: any) {
        return res.status(400).json({ error: error.message });
      }
    });

    return router;
  }
}
