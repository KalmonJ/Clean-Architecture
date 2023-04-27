import { StripeInterface } from "./stripe.interface";
import Stripe from "stripe";

export class StripeAdapter implements StripeInterface {
  async checkout(items: any[]): Promise<string | null> {
    const stripe = new Stripe(
      "sk_test_51N1KYRIakDSlzaqYf85gCrqeK0jMTIR235qhYdGmvhXJ3rstaOOPCQAMsKAjvxGkfJxtoYv4Yz7eionZEQ3TaS6f006XdjhJB4",
      { typescript: true, apiVersion: "2022-11-15" }
    );

    const session = await stripe.checkout.sessions.create({
      line_items: items,
      mode: "payment",
      success_url: "http://localhost:3000",
      cancel_url: "http://localhost:3000/checkout",
    });

    return session.url;
  }
}
