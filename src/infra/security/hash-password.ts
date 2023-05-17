import bcrypt from "bcrypt";
import { HashPasswordInterface } from "./hash-password.interface";

export class HashPassword implements HashPasswordInterface {
  salt: number;

  constructor(salt?: number) {
    this.salt = salt || 10;
  }

  async encrypt(password: string): Promise<string> {
    console.log(password, "senhaaaaaaaa");

    return await bcrypt.hash(password, 10);
  }

  async compare(password: string, encrypted: string): Promise<boolean> {
    return await bcrypt.compare(password, encrypted);
  }
}
