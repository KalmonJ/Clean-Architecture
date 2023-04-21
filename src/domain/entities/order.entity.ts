interface OrderEntityProps {
  id: string;
  billing: BillingInfo;
  shipphing: ShippingInfo;
  payment: PaymentDetails;
  orderStatus: OrderStatus;
  cart: string;
}

interface BillingInfo {
  name: string;
  email: string;
  phone: string;
}

interface ShippingInfo {
  address: string;
  zip: number;
  city: string;
  country: string;
}

interface PaymentDetails {
  paymentMethod: PaymentMethods;
  eMoneyNumber: number;
  eMoneyPIN: number;
}

type PaymentMethods = "E-MONEY" | "CASH ON DELIVERY";
type OrderStatus = "AWAITING PAYMENT" | "COMPLETE" | "CANCELED";

export class OrderEntity {
  props: OrderEntityProps;

  constructor(props: OrderEntityProps) {
    this.props = {
      ...props,
    };
  }
}
