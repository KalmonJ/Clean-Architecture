import { UserEntity } from "../../domain/entities/user.entity";
import { OutputError } from "../../domain/interfaces/error.interface";
import { HashPasswordInterface } from "../../domain/interfaces/hash-password.interface";
import { IdGeneratorInterface } from "../../domain/interfaces/id-generator.interface";
import { UserRepository } from "../../domain/repositories/user.repository";

export class CreateUserUseCase {
  constructor(
    private userRepo: UserRepository,
    private hashService: HashPasswordInterface,
    private idGenerate: IdGeneratorInterface
  ) {}

  async execute(input: InputUser): Promise<OutputUser | OutputError> {
    try {
      const encryptPassword = await this.hashService.encrypt(input.password);
      const user = new UserEntity({
        ...input,
        password: encryptPassword,
        id: this.idGenerate.generate(),
      });
      await this.userRepo.insert(user);
      return user.toJSON();
    } catch (error: any) {
      return { error: error.message };
    }
  }
}

export type InputUser = {
  username: string;
  email: string;
  image?: string;
  password: string;
  phone: string;
};

export type OutputUser = {
  username: string;
  email: string;
  image?: string;
  phone: string;
  id: string;
};
