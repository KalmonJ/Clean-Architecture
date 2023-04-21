import { InputSendMail } from "./mail";

export interface MailInterface {
  sendMail(input: InputSendMail): void;
}
