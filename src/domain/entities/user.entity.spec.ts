import { IdGenerator } from "../services/id-generator";
import { UserEntity, UserEntityProps } from "./user.entity";

describe("User test", () => {
  it("test user constructor", () => {
    const userProps: UserEntityProps = {
      email: "teste@email.com",
      image: "",
      phone: "(34) 99659-7940",
      username: "Maria",
      password: "any",
      id: new IdGenerator().generate(),
    };

    const user = new UserEntity(userProps);

    expect(user.props).toStrictEqual({ ...userProps, id: user.props.id });
  });

  it("test update user method", () => {
    const userProps: UserEntityProps = {
      email: "teste@email.com",
      image: "",
      phone: "(34) 99659-7940",
      username: "any",
      password: "any",
      id: new IdGenerator().generate(),
    };

    const user = new UserEntity(userProps);

    user.update({ username: "anyany" });

    expect(user.props.username).toBe("anyany");
  });
});
