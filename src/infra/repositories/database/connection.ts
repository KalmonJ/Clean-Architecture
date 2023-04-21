import mongoose from "mongoose";
import { ConnectionInterface } from "./connection.interface";

export class Connection implements ConnectionInterface {
  connect(): void {
    mongoose
      .connect(
        "mongodb+srv://kalmon:kalmon@cluster0.k0hmnyk.mongodb.net/e-commerce?retryWrites=true&w=majority"
      )
      .then(() => console.log("db connection successfully"))
      .catch((err) => console.log(err));
  }
}
