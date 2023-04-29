import { ProductEntityProps } from "../../domain/entities/product.entity";
import { StripeInterface } from "./stripe.interface";
import Stripe from "stripe";

export class StripeAdapter implements StripeInterface {
  prices: Stripe.Price[] | null = null;
  products: Stripe.Product[] | null = null;
  stripe = new Stripe(
    "sk_test_51N1KYRIakDSlzaqYf85gCrqeK0jMTIR235qhYdGmvhXJ3rstaOOPCQAMsKAjvxGkfJxtoYv4Yz7eionZEQ3TaS6f006XdjhJB4",
    { typescript: true, apiVersion: "2022-11-15" }
  );

  private async createProduct(cartItems: ProductEntityProps[]) {
    const productsResult = cartItems.map(
      async (item) =>
        await this.stripe.products.create({
          name: item.name,
          active: true,
          id: item.id,
          images: [item.image ?? ""],
          description: item.description,
          shippable: true,
          metadata: {
            price: item.price,
            category: item.category,
            quantity: item.quantity,
          },
        })
    );
    this.products = await Promise.all(productsResult);
    const pricesResult = this.products.map(
      async (product) =>
        await this.stripe.prices.create({
          currency: "usd",
          unit_amount: product.metadata.price as unknown as number,
          product: product.id,
          metadata: {
            quantity: product.metadata.quantity,
          },
        })
    );
    this.prices = await Promise.all(pricesResult);
  }

  async checkout(cartItems: ProductEntityProps[]): Promise<string | null> {
    await this.createProduct(cartItems);
    if (!this.prices) throw new Error("Prices have not been provided!");
    const session = await this.stripe.checkout.sessions.create({
      line_items: this.prices.map((price) => ({
        price: price.id,
        quantity: price.metadata.quantity as unknown as number,
      })),
      mode: "payment",
      success_url: "http://localhost:3000",
      cancel_url: "http://localhost:3000/checkout",
    });
    return session.url;
  }
}
