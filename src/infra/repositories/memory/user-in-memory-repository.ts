import { UserEntity } from "../../../domain/entities/user.entity";
import { UserRepository } from "../../../domain/repositories/user.repository";

export class UserInMemoryRepository implements UserRepository {
  users: UserEntity[] = [];

  async insert(user: UserEntity): Promise<void> {
    this.users.push(user);
  }
  async findById(id: string): Promise<UserEntity> {
    const findUser = this.users.find((user) => user.props.id === id);
    if (!findUser) throw new Error("User not found");
    return findUser;
  }
  async findByEmail(email: string): Promise<UserEntity> {
    const user = this.users.find((users) => users.props.email === email);
    if (!user) throw new Error("User not found");
    return user;
  }
  async update(id: string, user: UserEntity): Promise<boolean> {
    const foundedIndex = this.users.findIndex((el) => el.props.id === id);
    if (foundedIndex >= 0) {
      this.users[foundedIndex] = user;
      return true;
    }
    return false;
  }
}
