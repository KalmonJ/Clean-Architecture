import { UserEntity } from "../entities/user.entity";

export interface UserRepository {
  insert(user: UserEntity): Promise<void>;
  update(id: string, user: UserEntity): Promise<boolean>;
  findById(id: string): Promise<UserEntity>;
  findByEmail(email: string): Promise<UserProps>;
}

export interface UserProps {
  username: string;
  password: string;
  email: string;
  phone: string;
  image?: string;
  id: string;
}
