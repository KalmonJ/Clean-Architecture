import { InputSendMail } from "../../infra/adapters/mail";
import { MailInterface } from "../../infra/adapters/mail.interface";

export class SendEmailRegisterUseCase {
  constructor(private mail: MailInterface) {}

  async execute(input: InputSendMail): Promise<void> {
    this.mail.sendMail(input);
  }
}
