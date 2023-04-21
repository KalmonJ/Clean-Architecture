import { InvalidEmailAddressError } from "../errors/invalid-email-address.error";
import { InvalidPhoneNumberError } from "../errors/invalid-phone-number.error";

export type UserEntityProps = {
  image?: string;
  username: string;
  password: string;
  email: string;
  phone: string;
  id: string;
};

export class UserEntity {
  props: UserEntityProps;
  constructor(props: UserEntityProps) {
    this.props = props;
    this.verifyEmail();
    this.verifyPhone();
  }

  update(user: Partial<UserEntityProps>) {
    if (user.email) {
      this.props.email = user.email;
    }

    if (user.phone) {
      this.props.phone = user.phone;
    }

    if (user.username) {
      this.props.username = user.username;
    }

    if (user.image) {
      this.props.image = user.image;
    }

    this.verifyEmail();
    this.verifyPhone();
  }

  verifyEmail() {
    const emailRegex = /[a-zA-Z0-9_-]+@[a-zA-Z]+\.?[a-zA-Z]+/g;
    if (this.props.email && !emailRegex.test(this.props.email))
      throw new InvalidEmailAddressError("Invalid email address");
  }

  verifyPhone() {
    const phoneRegex = /\(\d{2}\) \d{5}-\d{4}/g;
    if (this.props.phone && !phoneRegex.test(this.props.phone))
      throw new InvalidPhoneNumberError();
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
