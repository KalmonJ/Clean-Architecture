import { UserEntity, UserEntityProps } from "../entities/user.entity";

export interface UserRepository {
  insert(user: UserEntity): Promise<UserOutputDto>;
  update(id: string, user: Partial<UserEntityProps>): Promise<boolean>;
  findById(id: string): Promise<UserOutputDto>;
  findByEmail(email: string): Promise<UserOutputDto>;
}

export interface UserOutputDto extends UserEntityProps {
  _id: string;
}
