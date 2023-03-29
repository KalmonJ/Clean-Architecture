import { Login } from "./log-in.use-case";
import { HashPassword } from "./../domain/services/hash-password";
import { Auth } from "./../domain/services/auth";
import { CreateUserUseCase } from "./create-user.use-case";
import { IdGenerator } from "./../domain/services/id-generator";
import { UserInMemoryRepository } from "../infra/repositories/memory/user-in-memory-repository";

describe("Login use case test", () => {
  it("should return a token if the credentials are correct", async () => {
    const repository = new UserInMemoryRepository();
    const hashService = new HashPassword();
    const idGenerate = new IdGenerator();

    const createUserUseCase = new CreateUserUseCase(
      repository,
      hashService,
      idGenerate
    );

    const user = await createUserUseCase.execute({
      email: "test@email.com",
      password: "test",
      phone: "(34) 99659-7940",
      username: "username",
    });

    if ("email" in user) {
      const auth = new Auth();
      const loginUseCase = new Login(repository, hashService, auth);
      const { token } = await loginUseCase.execute({
        email: user.email,
        password: "test",
      });

      expect(token).toBeTruthy();
    }
  });
});
