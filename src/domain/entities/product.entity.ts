import { GreaterThanError } from "../errors/greater-than.error";
import { NameLongError } from "../errors/name-long.error";

export class ProductEntity {
  props: ProductEntityProps;
  constructor(props: ProductEntityProps) {
    this.props = {
      ...props,
      name: props.name.trim(),
    };
    this.verifyPrice();
    this.verifyName();
  }

  verifyPrice() {
    if (this.props.price <= 0) {
      throw new GreaterThanError(
        "The product value must be greater than or equal to 0"
      );
    }
  }

  verifyName() {
    if (this.props.name.length > 30) {
      throw new NameLongError("Product name is too long");
    }

    if (this.props.name.length === 0) {
      throw new GreaterThanError("Product name must be greater than 0");
    }
  }

  update(values: Partial<ProductEntityProps>) {
    if (values.name) {
      this.props.name = values.name;
    }

    if (values.price) {
      this.props.price = values.price;
    }

    if (values.description) {
      this.props.description = values.description;
    }

    if (values.image) {
      this.props.image = values.image;
    }

    this.verifyName();
    this.verifyPrice();
  }

  toJSON() {
    return this.props;
  }
}

export type Category = "HEADPHONES" | "SPEAKERS" | "EARPHONES";

export type ProductEntityProps = {
  id: string;
  price: number;
  name: string;
  description: string;
  image?: string;
  creationDate: Date;
  category: Category;
  features: string;
  inTheBox: InTheBox[];
  quantity: number;
};

export type InTheBox = {
  name: string;
  quantity: 1;
};
