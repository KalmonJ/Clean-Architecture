import { AuthInterface } from "./auth.interface";
import * as json from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

export class Auth implements AuthInterface {
  async createToken(payload: object): Promise<string> {
    return json.sign(
      {
        data: payload,
      },
      process.env.JWT_SCRET || "",
      {
        expiresIn: "1 day",
      }
    );
  }
}
