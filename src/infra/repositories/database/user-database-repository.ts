import {
  UserEntity,
  UserEntityProps,
} from "../../../domain/entities/user.entity";
import { UserRepository } from "../../../domain/repositories/user.repository";
import usersModel from "./mongoDB/schemas/users.model";

export class UserDataBaseRepository implements UserRepository {
  async insert(user: UserEntity): Promise<UserEntityProps> {
    const response = new usersModel(user.toJSON());
    const savedUser = await response.save();
    return savedUser;
  }
  async update(id: string, user: UserEntity): Promise<boolean> {
    const response = await usersModel.findByIdAndUpdate(id, user);
    return !!response;
  }
  async findById(id: string): Promise<UserEntity> {
    try {
      const response = (await usersModel.findById(id)) as UserEntity;
      return response;
    } catch (error) {
      console.log(error);
      return {} as UserEntity;
    }
  }
  async findByEmail(email: string): Promise<UserEntityProps> {
    try {
      const [user] = await usersModel.find({ email });
      return user as unknown as UserEntityProps;
    } catch (error) {
      console.log(error);
      return {} as UserEntityProps;
    }
  }
}
