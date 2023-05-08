import { UserEntity, UserEntityProps } from "../entities/user.entity";

export interface UserRepository {
  insert(user: UserEntity): Promise<UserEntityProps>;
  update(id: string, user: UserEntity): Promise<boolean>;
  findById(id: string): Promise<UserEntity>;
  findByEmail(email: string): Promise<UserEntityProps>;
}
