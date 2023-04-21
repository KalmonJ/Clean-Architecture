export interface StripeInterface {
  checkout(): Promise<any>;
}
