import { AuthInterface } from "../../domain/interfaces/auth.interface";
import * as json from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

export class Auth implements AuthInterface {
  verify(token: string, callback: (err: any, user: any) => void) {
    json.verify(token, "anyyy" as string, callback);
  }
  async createToken(payload: object): Promise<string> {
    return json.sign(
      {
        data: payload,
      },
      "anyyy" as string,
      {
        expiresIn: "1 day",
      }
    );
  }
}
