import { UserEntity } from "../../../domain/entities/user.entity";
import {
  UserProps,
  UserRepository,
} from "../../../domain/repositories/user.repository";
import usersModel from "./mongoDB/schemas/users.model";

export class UserDataBaseRepository implements UserRepository {
  async insert(user: UserEntity): Promise<void> {
    try {
      const response = new usersModel(user.props);
      await response.save();
    } catch (error) {
      console.log(error);
    }
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
  async findByEmail(email: string): Promise<UserProps> {
    try {
      const [user] = await usersModel.find({ email });
      return user as unknown as UserProps;
    } catch (error) {
      console.log(error);
      return {} as UserProps;
    }
  }
}
