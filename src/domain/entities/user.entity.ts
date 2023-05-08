import z from "zod";

const userSchema = z.object({
  image: z.string().optional(),
  username: z
    .string()
    .max(27, { message: "Invalid username size" })
    .min(6, { message: "Invalid username size" }),
  password: z
    .string()
    .max(100, { message: "Invalid password size" })
    .min(8, { message: "Invalid password size" }),
  email: z.string().email({ message: "Invalid email" }),
  phone: z.string().refine((val) => /\(\d{2}\) \d{5}-\d{4}/g.test(val), {
    message: "Invalid phone number",
  }),
  id: z.string().uuid({ message: "Invalid identifier" }),
});

export type UserEntityProps = z.infer<typeof userSchema>;

export class UserEntity {
  props: UserEntityProps;
  constructor(props: UserEntityProps) {
    this.props = userSchema.parse(props);
  }

  update(user: Partial<UserEntityProps>) {
    if (user.email) {
      this.props.email = userSchema.shape.email.parse(user.email);
    }

    if (user.phone) {
      this.props.phone = userSchema.shape.phone.parse(user.phone);
    }

    if (user.username) {
      this.props.username = userSchema.shape.username.parse(user.username);
    }

    if (user.image) {
      this.props.image = userSchema.shape.image.parse(user.image);
    }
  }

  toJSON() {
    return {
      username: this.props.username,
      image: this.props.image,
      email: this.props.email,
      id: this.props.id,
      phone: this.props.phone,
    };
  }
}
