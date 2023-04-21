import { NextFunction, Request, Response } from "express";

export interface AuthMiddlewareInterface {
  authenticate(req: Request, res: Response, next: NextFunction): void;
}
