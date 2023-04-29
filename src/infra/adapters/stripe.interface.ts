import { ProductEntityProps } from "../../domain/entities/product.entity";

export interface StripeInterface {
  checkout(items: ProductEntityProps[]): Promise<string | null>;
}
