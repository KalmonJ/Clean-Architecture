import { OutputProduct } from "../../application/create-product.use-case";
import { CartSizeError } from "../errors/cart-size.error";
import { NegativePriceError } from "../errors/negative-price.error";

export type CartEntityProps = {
  items: OutputProduct[];
  totalValue: number;
  quantity: number;
  id: string;
};

export class CartEntity {
  props: CartEntityProps;
  constructor(props: CartEntityProps) {
    this.props = props;
    this.checkTotalValue();
    this.checkCartSize();
    this.checkQuantity();
  }

  checkCartSize() {
    if (this.props.items.length > 10) {
      throw new CartSizeError();
    }
  }

  checkTotalValue() {
    if (this.props.totalValue < 0) {
      throw new NegativePriceError();
    }
  }

  checkQuantity() {
    if (this.props.quantity !== this.props.items.length) {
      throw new Error(
        "O valor da quantidade deve ser igual a quantidade de items no carrinho" //TODO: criar uma classe pra definir este erro
      );
    }
  }

  toJSON() {
    return this.props;
  }
}
