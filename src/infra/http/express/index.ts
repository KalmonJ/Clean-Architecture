import express, { Express } from "express";
import * as routes from "../../../application/routes";
import { CreateProductUseCase } from "../../../application/usecases/create-product.use-case";
import { CreateUserUseCase } from "../../../application/usecases/create-user.use-case";
import { UpdateProductUseCase } from "../../../application/usecases/update-product.use-case";
import { UpdateUserUseCase } from "../../../application/usecases/update-user.use-case";
import { HashPassword } from "../../security/hash-password";
import { IdGenerator } from "../../../domain/services/id-generator";
import { UserController } from "../../controllers/user.controller";
import { ProductInMemoryRepository } from "../../repositories/memory/product-in-memory-repository";
import { UserInMemoryRepository } from "../../repositories/memory/user-in-memory-repository";
import { ProductController } from "../../controllers/product.controller";
import { GetAllProductsByCategoryUseCase } from "../../../application/usecases/get-all-products-by-category.use-case";
import { GetAllProductsOfTheWeekUseCase } from "../../../application/usecases/get-all-products-of-the-week.use-case";
import { SendEmailRegisterUseCase } from "./../../../application/usecases/send-email-register.use-case";
import { Mail } from "../../adapters/mail";
import { WeekProductsStrategy } from "../../strategies/week-products.strategy";
import { ProductDataBaseRepository } from "../../repositories/database/product-database-repository";
import { Connection } from "../../repositories/database/connection";
import { GetRecommendationsUseCase } from "../../../application/usecases/get-recommendations";
import { AuthController } from "../../controllers/auth.controller";
import { LoginUseCase } from "../../../application/usecases/log-in.use-case";
import { UserDataBaseRepository } from "../../repositories/database/user-database-repository";
import { Auth } from "../../security/auth";
import cors from "cors";

const app: Express = express();

new Connection().connect();

const productRepo = new ProductDataBaseRepository();
const productStrategy = new WeekProductsStrategy();
const userRepo = new UserDataBaseRepository();
const hashService = new HashPassword();
const idGenerate = new IdGenerator();
const auth = new Auth();
const sendMail = new Mail();

const container = {
  authController: new AuthController(
    new LoginUseCase(userRepo, hashService, auth)
  ),

  userController: new UserController(
    new CreateUserUseCase(userRepo, hashService, idGenerate),
    new UpdateUserUseCase(userRepo),
    new SendEmailRegisterUseCase(sendMail)
  ),
  productController: new ProductController(
    new CreateProductUseCase(productRepo, idGenerate),
    new UpdateProductUseCase(productRepo),
    new GetAllProductsByCategoryUseCase(productRepo, productStrategy),
    new GetAllProductsOfTheWeekUseCase(productRepo, productStrategy),
    new GetRecommendationsUseCase(productRepo)
  ),
};
const userRoutes = new routes.UserRoutes(container.userController);
const productRoutes = new routes.ProductRoutes(container.productController);
const authRoutes = new routes.AuthRoutes(container.authController);

app.use(
  express.json(),
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
  userRoutes.registerRoutes(),
  productRoutes.registerRoutes(),
  authRoutes.registerRoutes()
);

app.listen(4040, () => {
  console.log("server is running!");
});
