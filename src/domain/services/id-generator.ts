import { randomUUID } from "node:crypto";
import { IdGeneratorInterface } from "../interfaces/id-generator.interface";

export class IdGenerator implements IdGeneratorInterface {
  generate() {
    return randomUUID();
  }
}
