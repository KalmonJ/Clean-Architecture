import { CreateUserUseCase } from "../../application/usecases/create-user.use-case";
import { UpdateUserUseCase } from "../../application/usecases/update-user.use-case";
import { Request, Response } from "express";
import { SendEmailRegisterUseCase } from "../../application/usecases/send-email-register.use-case";

export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private updateUserUseCase: UpdateUserUseCase,
    private sendMail: SendEmailRegisterUseCase
  ) {
    this.createUser = this.createUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }
  async createUser(req: Request, res: Response) {
    try {
      const user = await this.createUserUseCase.execute(req.body);
      if ("error" in user) {
        throw new Error(user.error);
      }

      await this.sendMail.execute({
        from: "kalmonkk69@gmail.com",
        to: user.email,
        subject: "Account created",
        text: "Hello this is email test!",
        message: "Hello this is email test!",
      });
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
