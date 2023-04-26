import { Router } from "express";

export interface ExpressRouterInterface {
  registerRoutes(): Router;
}
