import z from "zod";
import { ErrorMessages } from "../errors/enum";

const userSchema = z.object({
  image: z.string().optional(),
  username: z
    .string()
    .max(27, { message: ErrorMessages.USERNAME_SIZE })
    .min(6, { message: ErrorMessages.USERNAME_SIZE }),
  password: z
    .string()
    .max(100, { message: ErrorMessages.PASSWORD_SIZE })
    .min(8, { message: ErrorMessages.PASSWORD_SIZE }),
  email: z.string().email({ message: ErrorMessages.INVALID_EMAIL }),
  phone: z.string().refine((val) => /\(\d{2}\) \d{5}-\d{4}/g.test(val), {
    message: ErrorMessages.INVALID_PHONE_NUMBER,
  }),
  id: z.string().uuid({ message: ErrorMessages.INVALID_IDENTIFIER }),
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
