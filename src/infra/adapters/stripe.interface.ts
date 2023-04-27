export interface StripeInterface {
  checkout(items: any[]): Promise<string | null>;
}
