import { AuthInterface } from "../../infra/security/auth.interface";
import { HashPasswordInterface } from "../../infra/security/hash-password.interface";
import { UserRepository } from "../../domain/repositories/user.repository";

export class LoginUseCase {
  constructor(
    private usersRepo: UserRepository,
    private hashService: HashPasswordInterface,
    private auth: AuthInterface
  ) {}
  async execute(input: InputLogin): Promise<OutputLogin> {
    const user = await this.usersRepo.findByEmail(input.email);
    if (!user) throw new Error("User not found");
    const match = await this.hashService.compare(
      input.password,
      user.password ?? ""
    );
    if (!match) throw new Error("Invalid credentials");
    return {
      token: await this.auth.createToken({
        username: user.username,
        email: user.email,
        image: user.image,
        phone: user.phone,
        id: user._id,
      }),
    };
  }
}

export type InputLogin = {
  email: string;
  password: string;
};

export type OutputLogin = {
  token: string;
};
