import { HashPassword } from "../../domain/services/hash-password";
import { IdGenerator } from "../../domain/services/id-generator";
import { UserInMemoryRepository } from "../../infra/repositories/memory/user-in-memory-repository";
import { CreateUserUseCase, InputUser } from "./create-user.use-case";
import { UpdateUserUseCase } from "./update-user.use-case";

describe("Update user use case", () => {
  it("Should update user", async () => {
    const newUser: InputUser = {
      email: "any@email.com",
      password: "any",
      username: "any username",
      phone: "(34) 99999-9999",
    };

    const inMemoryUserRepository = new UserInMemoryRepository();
    const idGenerate = new IdGenerator();
    const hash = new HashPassword();
    const createUseCase = new CreateUserUseCase(
      inMemoryUserRepository,
      hash,
      idGenerate
    );
    await createUseCase.execute(newUser);

    const userId = inMemoryUserRepository.users[0].props.id;

    const updateUseCase = new UpdateUserUseCase(inMemoryUserRepository);
    const updated = await updateUseCase.execute(userId as string, {
      username: "New name",
    });

    expect(inMemoryUserRepository.users).toHaveLength(1);
    expect(updated).toBeTruthy();
    expect(inMemoryUserRepository.users[0].props.username).toBe("New name");
  });
});
