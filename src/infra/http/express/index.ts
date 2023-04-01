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

const app: Express = express();

const userRepo = new UserInMemoryRepository();
const hashService = new HashPassword();
const idGenerate = new IdGenerator();
const createUserUseCase = new CreateUserUseCase(
  userRepo,
  hashService,
  idGenerate
);
const updateUserUseCase = new UpdateUserUseCase(userRepo);

const container = {
  userController: new UserController(createUserUseCase, updateUserUseCase),
};

const userRoutes = new routes.UserRoutes(container.userController);
app.use(express.json(), userRoutes.registerRoutes());

app.listen(3030, () => {
  console.log("server is running!");
});
