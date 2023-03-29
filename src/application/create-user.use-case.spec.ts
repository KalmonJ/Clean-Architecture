import { HashPassword } from "../domain/services/hash-password";
import { IdGenerator } from "../domain/services/id-generator";
import { UserInMemoryRepository } from "../infra/repositories/memory/user-in-memory-repository";
import { InputUser, CreateUserUseCase } from "./create-user.use-case";

describe("User use case test", () => {
  it("Should create new User", async () => {
    const newUser: InputUser = {
      email: "email@rmail.com",
      username: "any",
      phone: "(34) 99659-7940",
      password: "any",
    };

    const repository = new UserInMemoryRepository();
    const service = new HashPassword();
    const idGenerate = new IdGenerator();
    const useCase = new CreateUserUseCase(repository, service, idGenerate);

    const user = await useCase.execute(newUser);

    const compare = newUser.password === repository.users[0].props.password;

    expect(repository.users).toHaveLength(1);
    expect(compare).toBeFalsy();
    expect("username" in user && user.username).toBe(newUser.username);
  });
});
