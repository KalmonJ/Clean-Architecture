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

const app: Express = express();

const productRepo = new ProductInMemoryRepository();
const userRepo = new UserInMemoryRepository();
const hashService = new HashPassword();
const idGenerate = new IdGenerator();

const container = {
  userController: new UserController(
    new CreateUserUseCase(userRepo, hashService, idGenerate),
    new UpdateUserUseCase(userRepo)
  ),
  productController: new ProductController(
    new CreateProductUseCase(productRepo, idGenerate),
    new UpdateProductUseCase(productRepo),
    new GetAllProductsByCategoryUseCase(productRepo),
    new GetAllProductsOfTheWeekUseCase(productRepo)
  ),
};
const userRoutes = new routes.UserRoutes(container.userController);
const productRoutes = new routes.ProductRoutes(container.productController);
app.use(
  express.json(),
  userRoutes.registerRoutes(),
  productRoutes.registerRoutes()
);

app.listen(3030, () => {
  console.log("server is running!");
});
