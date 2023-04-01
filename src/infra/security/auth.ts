import { AuthInterface } from "./auth.interface";
import * as json from "jsonwebtoken";

export class Auth implements AuthInterface {
  async createToken(payload: object): Promise<string> {
    return json.sign(
      {
        data: payload,
      },
      "ijifewiefsdfasd",
      {
        expiresIn: "1 day",
      }
    );
  }
}
