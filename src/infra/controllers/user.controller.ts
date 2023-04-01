import { CreateUserUseCase } from "../../application/usecases/create-user.use-case";
import { UpdateUserUseCase } from "../../application/usecases/update-user.use-case";
import { Request, Response } from "express";

export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private updateUserUseCase: UpdateUserUseCase
  ) {}

  async createUser(req: Request, res: Response) {
    try {
      const user = await this.createUserUseCase.execute(req.body);

      if ("error" in user) {
        throw new Error(user.error);
      }
      return res.status(201).json(user);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const updated = await this.updateUserUseCase.execute(
        req.params.id,
        req.body
      );

      return res.status(200).json(updated);
    } catch (error: any) {
      return res.status(400).json(error);
    }
  }
}
