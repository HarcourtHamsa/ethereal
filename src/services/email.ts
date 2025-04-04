import { Resend } from "resend";
import { resendClient } from "../config/mail";
import { EmailProps, EmailType } from "../types/email";
import { getEmailTemplate } from "../utils/email";

class EmailService {
  private resend: Resend;

  constructor() {
    this.resend = resendClient;
  }

  async sendEmail({ type, data }: { type: EmailType; data: EmailProps }) {
    const { recipientEmail } = data;
    const result = await getEmailTemplate({ type, data });

    if (result) {
      const { subject, template } = result;

      try {
        await this.resend.emails.send({
          to: [recipientEmail],
          from: "Ethereal <support@postwallet.africa>",
          subject: subject,
          html: template,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      throw new Error("Email template not found");
    }
  }
}

export default EmailService;
