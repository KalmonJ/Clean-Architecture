import { UserEntity, UserEntityProps } from "../../domain/entities/user.entity";
import { HashPasswordInterface } from "../../infra/security/hash-password.interface";
import { IdGeneratorInterface } from "../../domain/interfaces/id-generator.interface";
import {
  UserOutputDto,
  UserRepository,
} from "../../domain/repositories/user.repository";

export class CreateUserUseCase {
  constructor(
    private userRepo: UserRepository,
    private hashService: HashPasswordInterface
  ) {}

  async execute(input: InputUser): Promise<UserOutputDto> {
    const encryptPassword = await this.hashService.encrypt(input.password);
    const user = new UserEntity({
      ...input,
      password: encryptPassword,
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
