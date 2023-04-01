import { InvalidCredentials } from "../../domain/errors/invalid-credentials.error";
import { UserNotFound } from "../../domain/errors/user-not-found.error";
import { AuthInterface } from "../../infra/security/auth.interface";
import { HashPasswordInterface } from "../../infra/security/hash-password.interface";
import { UserRepository } from "../../domain/repositories/user.repository";

export class Login {
  constructor(
    private usersRepo: UserRepository,
    private hashService: HashPasswordInterface,
    private auth: AuthInterface
  ) {}
  async execute(input: InputLogin): Promise<OutputLogin> {
    const user = await this.usersRepo.findByEmail(input.email);
    if (!user) throw new UserNotFound();
    const match = await this.hashService.compare(
      input.password,
      user.props.password
    );
    if (!match) throw new InvalidCredentials();
    return { token: await this.auth.createToken(user) };
  }
}

export type InputLogin = {
  email: string;
  password: string;
};

export type OutputLogin = {
  token: string;
};
