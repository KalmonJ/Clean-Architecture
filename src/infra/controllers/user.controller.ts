import { SendEmailRegisterUseCase } from "../../application/usecases/send-email-register.use-case";
import { CreateUserUseCase } from "../../application/usecases/create-user.use-case";
import { UpdateUserUseCase } from "../../application/usecases/update-user.use-case";
import { Request, Response } from "express";
import { CreateCartUseCase } from "../../application/usecases/create-cart.use-case";

export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private updateUserUseCase: UpdateUserUseCase,
    private createCartUserCase: CreateCartUseCase,
    private sendMail: SendEmailRegisterUseCase
  ) {
    this.createUser = this.createUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }
  async createUser(req: Request, res: Response) {
    try {
      const user = await this.createUserUseCase.execute(req.body);

      console.log(user, "usuáriooo");

      // await this.createCartUserCase.execute({ owner: user.id, items: [] });

      // await this.sendMail.execute({
      //   from: "kalmonkk69@gmail.com",
      //   to: user.email,
      //   subject: "Account created",
      //   text: "Hello this is email test!",
      //   message: "Hello this is email test!",
      // });
      return res.status(201).json(user);
    } catch (error: any) {
      console.log(error, "errroooooooo");
      return res.status(400).json(error);
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
