import { OutputProduct } from "../../application/usecases/create-product.use-case";
import { CartSizeError } from "../errors/cart-size.error";

export type CartEntityProps = {
  items: OutputProduct[];
  id: string;
};

export class CartEntity {
  props: CartEntityProps;
  constructor(props: CartEntityProps) {
    this.props = props;
    this.checkCartSize();
  }

  checkCartSize() {
    if (this.props.items.length > 10) {
      throw new CartSizeError();
    }
  }

  getTotal(): number {
    return this.props.items.reduce((acc, curr) => acc + curr.price, 0);
  }

  getTotalWithShipping(shippingValue: number): number {
    return this.getTotal() + shippingValue;
  }

  getTotalWithVat(vatPercentage?: number): number {
    const percentage = vatPercentage || 15;
    return (this.getTotal() * (100 + percentage)) / 100;
  }

  getFinalPrice(): number {
    return (
      this.getTotalWithVat(15) - this.getTotal() + this.getTotalWithShipping(50)
    );
  }

  toJSON() {
    return this.props;
  }
}
