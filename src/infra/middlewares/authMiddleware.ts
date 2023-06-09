import { NextFunction, Request, Response } from "express";
import { AuthMiddlewareInterface } from "./authMiddleware.interface";
import { UserEntityProps } from "../../domain/entities/user.entity";
import { Auth } from "../security/auth";

declare global {
  namespace Express {
    interface Request {
      user: UserEntityProps;
    }
  }
}

export class AuthMiddleware implements AuthMiddlewareInterface {
  authenticate(req: Request, res: Response, next: NextFunction): void {
    const [_, token] = req.headers.authorization?.split(" ") as string[];

    const auth = new Auth();
    if (token) {
      auth.verify(token, (err, user) => {
        if (err) {
          return res
            .status(403)
            .send({ success: false, message: "Token expired!" });
        }

        req.user = user;
        next();
      });
    } else {
      res.status(401).json({ sucess: false, message: "Unauthorized" });
    }
  }
}
