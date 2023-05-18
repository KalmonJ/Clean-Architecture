import {
  UserEntity,
  UserEntityProps,
} from "../../../domain/entities/user.entity";
import {
  UserOutputDto,
  UserRepository,
} from "../../../domain/repositories/user.repository";
import usersModel from "./mongoDB/schemas/users.model";

export class UserDataBaseRepository implements UserRepository {
  async insert(user: UserEntity): Promise<UserOutputDto> {
    const response = new usersModel(user.props);
    const savedUser = await (await response.save()).populate("cart");
    return savedUser;
  }
  async update(id: string, user: Partial<UserEntityProps>): Promise<boolean> {
    const response = await usersModel.findByIdAndUpdate(id, user);
    return !!response;
  }
  async findById(id: string): Promise<UserOutputDto> {
    const response = (await usersModel
      .findOne({ id })
      .populate("cart")) as UserOutputDto;
    return response;
  }
  async findByEmail(email: string): Promise<UserOutputDto> {
    const [user] = await usersModel.find({ email });
    return user as unknown as UserOutputDto;
  }
}
