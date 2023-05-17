import z from "zod";
import { ErrorMessages } from "../errors/enum";

const categoryEnum = z.enum(["HEADPHONES", "SPEAKERS", "EARPHONES"]);

const inTheBoxSchema = z.object({
  name: z.string(),
  quantity: z.number().positive(),
});

export const productSchema = z.object({
  id: z.string().uuid(),
  price: z.number(),
  name: z
    .string()
    .trim()
    .max(30, { message: ErrorMessages.PRODUCT_NAME })
    .min(0, { message: ErrorMessages.PRODUCT_NAME }),
  description: z.string(),
  image: z.string().optional(),
  creationDate: z.union([z.date(), z.string()]),
  category: categoryEnum,
  features: z.string(),
  quantity: z.number().positive(),
  inTheBox: z.array(inTheBoxSchema),
});

export class ProductEntity {
  props: ProductEntityProps;
  constructor(props: ProductEntityProps) {
    this.props = productSchema.parse(props);
  }

  update(values: Partial<ProductEntityProps>) {
    if (values.name) {
      this.props.name = productSchema.shape.name.parse(values.name);
    }
    if (values.price) {
      this.props.price = productSchema.shape.price.parse(values.price);
    }
    if (values.description) {
      this.props.description = productSchema.shape.description.parse(
        values.description
      );
    }
    if (values.image) {
      this.props.image = productSchema.shape.image.parse(values.image);
    }
  }

  toJSON() {
    return this.props;
  }
}

export type Category = z.infer<typeof categoryEnum>;
export type ProductEntityProps = z.infer<typeof productSchema>;
export type InTheBox = z.infer<typeof inTheBoxSchema>;
