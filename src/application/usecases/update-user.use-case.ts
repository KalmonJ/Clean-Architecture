import { UserNotFound } from "../../domain/errors/user-not-found.error";
import { UserRepository } from "../../domain/repositories/user.repository";

export class UpdateUserUseCase {
  constructor(private userRepo: UserRepository) {}

  async execute(id: string, input: InputUpdateUser): Promise<boolean> {
    const user = await this.userRepo.findById(id);

    if (!user) throw new UserNotFound();

    user.update(input);
    const updated = await this.userRepo.update(id, user);
    return updated;
  }
}

type InputUpdateUser = {
  username?: string;
  email?: string;
  image?: string;
  phone?: string;
  password?: string;
};
