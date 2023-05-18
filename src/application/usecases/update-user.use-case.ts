import { UserEntity, UserEntityProps } from "../../domain/entities/user.entity";
import { UserRepository } from "../../domain/repositories/user.repository";

export class UpdateUserUseCase {
  constructor(private userRepo: UserRepository) {}

  async execute(id: string, input: Partial<UserEntityProps>): Promise<boolean> {
    const updated = await this.userRepo.update(id, input);
    return updated;
  }
}
