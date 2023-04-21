import { StripeInterface } from "./stripe.interface";

export class Stripe implements StripeInterface {
  checkout(): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
