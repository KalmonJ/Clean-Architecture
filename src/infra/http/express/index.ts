import express, { Express } from "express";
import { CreateProductUseCase } from "../../../application/create-product.use-case";
import { CreateUserUseCase } from "../../../application/create-user.use-case";
import * as routes from "../../../application/routes";
import { UpdateProductUseCase } from "../../../application/update-product.use-case";
import { UpdateUserUseCase } from "../../../application/update-user.use-case";
import { HashPassword } from "../../../domain/services/hash-password";
import { IdGenerator } from "../../../domain/services/id-generator";
import { ProductInMemoryRepository } from "../../product-in-memory-repository";
import { UserInMemoryRepository } from "../../user-in-memory-repository";

const app: Express = express();

const productRepository = new ProductInMemoryRepository();
const idGenerate = new IdGenerator();
const createProductUseCase = new CreateProductUseCase(
  productRepository,
  idGenerate
);

const updateProductUseCase = new UpdateProductUseCase(productRepository);

const userRepository = new UserInMemoryRepository();
const hashService = new HashPassword();
const createUserUseCase = new CreateUserUseCase(
  userRepository,
  hashService,
  idGenerate
);

const updateUserUseCase = new UpdateUserUseCase(userRepository);

const productRoutes = new routes.ProductRoutes(
  createProductUseCase,
  updateProductUseCase
);
const userRoutes = new routes.UserRoutes(createUserUseCase, updateUserUseCase);

app.use(
  express.json(),
  productRoutes.registerRoutes(),
  userRoutes.registerRoutes()
);

app.listen(3030, () => {
  console.log("server is running!");
});
