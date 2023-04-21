import { LoginUseCase } from "../../application/usecases/log-in.use-case";
import { Request, Response } from "express";

export class AuthController {
  constructor(private loginUseCase: LoginUseCase) {
    this.login = this.login.bind(this);
  }

  async login(req: Request, res: Response) {
    try {
      const response = await this.loginUseCase.execute(req.body);
      if (response.token.length > 0) {
        res.status(200).json(response);
      }
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}
