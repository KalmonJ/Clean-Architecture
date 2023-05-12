import { UserEntity, UserEntityProps } from "../../domain/entities/user.entity";
import { HashPasswordInterface } from "../../infra/security/hash-password.interface";
import { IdGeneratorInterface } from "../../domain/interfaces/id-generator.interface";
import { UserRepository } from "../../domain/repositories/user.repository";

export class CreateUserUseCase {
  constructor(
    private userRepo: UserRepository,
    private hashService: HashPasswordInterface,
    private idGenerate: IdGeneratorInterface
  ) {}

  async execute(input: InputUser): Promise<UserEntityProps> {
    const encryptPassword = await this.hashService.encrypt(input.password);
    const user = new UserEntity({
      ...input,
      password: encryptPassword,
      id: this.idGenerate.generate(),
    });
    const response = await this.userRepo.insert(user);
    return response;
  }
}

export type InputUser = {
  username: string;
  email: string;
  image?: string;
  password: string;
  phone: string;
};
