import { ErrorMessages } from "../errors/enum";
import { productSchema } from "./product.entity";
import z from "zod";

const cartSchema = z.object({
  id: z.string().uuid(),
  owner: z.string(),
  finalPrice: z.number().optional(),
  total: z.number().optional(),
  totalWithVat: z.number().optional(),
  shippingValue: z.number().optional(),
  vat: z.number().optional(),
  items: z
    .array(productSchema)
    .length(10, { message: ErrorMessages.CART_LENGHT }),
});

export type CartEntityProps = z.infer<typeof cartSchema>;

export class CartEntity {
  props: CartEntityProps;

  constructor(props: CartEntityProps) {
    this.props = cartSchema.parse(props);
    this.setTotal();
    this.setShippingValue();
    this.setVat();
    this.setFinalPrice();
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
    } else {
      this.props.shippingValue = 0;
    }
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
    } else {
      this.props.vat = 0;
    }
  }

  setFinalPrice() {
    if (this.props.total && this.props.shippingValue && this.props.vat) {
      this.props.finalPrice =
        this.props.total + this.props.shippingValue + this.props.vat;
    } else {
      this.props.finalPrice = 0;
    }
  }

  toJSON() {
    return this.props;
  }
}
