import { MailInterface } from "./mail.interface";
import * as nm from "nodemailer";

export class Mail implements MailInterface {
  sendMail(input: InputSendMail): void {
    try {
      const transporter = nm.createTransport({
        service: "gmail",
        auth: {
          user: "kalmonkk69@gmail.com",
          pass: "xpifabejnuwlrcyo",
        },
      });
      transporter.sendMail(input);
    } catch (error) {
      console.log(error);
    }
  }
}

export type InputSendMail = {
  from: string;
  to: string | string[];
  subject: string;
  text: string;
  message: string;
};
