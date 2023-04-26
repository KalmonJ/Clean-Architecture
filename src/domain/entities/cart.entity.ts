import { OutputProduct } from "../../application/usecases/create-product.use-case";
import { CartSizeError } from "../errors/cart-size.error";

export type CartEntityProps = {
  items: OutputProduct[];
  vat?: number;
  shippingValue?: number;
  total?: number;
  totalWithVat?: number;
  finalPrice?: number;
  id: string;
};

export class CartEntity {
  props: CartEntityProps;
  constructor(props: CartEntityProps) {
    this.props = props;
    this.checkCartSize();
    this.setTotal();
    this.setShippingValue();
    this.setVat();
  }

  checkCartSize() {
    if (this.props.items.length > 10) {
      throw new CartSizeError();
    }
  }

  setTotal() {
    this.props.total = this.props.items.reduce(
      (acc, curr) => acc + curr.price,
      0
    );
  }

  setShippingValue() {
    if (this.props.total && this.props.total <= 5000) {
      this.props.shippingValue = 50;
    }
    this.props.shippingValue = 0;
  }

  setVat() {
    const VAT = 0.2; // 20% vat tax

    if (this.props.total) {
      this.props.vat = this.props.items.reduce((vat, curr) => {
        let currVat = curr.price * VAT;
        currVat = vat + currVat;
        vat = currVat;
        return vat;
      }, 0);
      this.props.totalWithVat = this.props.total + this.props.vat;
    }

    this.props.vat = 0;
  }

  getFinalPrice() {
    if (this.props.total && this.props.shippingValue && this.props.vat) {
      this.props.finalPrice =
        this.props.total + this.props.shippingValue + this.props.vat;
    }
  }

  toJSON() {
    return this.props;
  }
}
