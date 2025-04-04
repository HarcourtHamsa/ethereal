import { adminInviteEmailTemplate } from "../templates/admin-invite.template";
import { adminWelcomeEmailTemplate } from "../templates/admin-welcome.template";
import { changePasswordEmailTemplate } from "../templates/change-password.template";
import { kycApprovalTemplate } from "../templates/kyc-approval-template";
import { kycRejectionTemplate } from "../templates/kyc-rejection.template";
import { forgotPasscodeEmailTemplate } from "../templates/forgot-passcode.template";
import { forgotPasswordEmailTemplate } from "../templates/forgot-password.template";
import { loginEmailTemplate } from "../templates/login.template";
import { welcomeEmailTemplate } from "../templates/welcome.template";

import {
  AdminInviteEmailProps,
  AdminWelcomeEmailProps,
  ChangePasswordEmailProps,
  EmailProps,
  EmailType,
  ForgotPasscodeEmailProps,
  ForgotPasswordEmailProps,
  KycStatusEmailProps,
  LoginEmailProps,
  WelcomeEmailProps,
} from "../types/email";

export async function getEmailTemplate({
  type,
  data,
}: {
  type: EmailType;
  data: EmailProps;
}) {
  switch (type) {
    case "send-welcome-email": {
      const { firstName, lastName, otp } = data as WelcomeEmailProps;
      return {
        subject: "Welcome to Ethereal",
        template: welcomeEmailTemplate({
          firstName,
          lastName,
          otp,
        }),
      };
    }

    case "send-kyc-approval-email": {
      const { firstName, status } = data as KycStatusEmailProps;
      return {
        subject: "[Update] Kyc Approved",
        template: kycApprovalTemplate({
          firstName,
          status,
        }),
      };
    }

    case "send-kyc-rejection-email": {
      const { firstName, status } = data as KycStatusEmailProps;
      return {
        subject: "[Update] Kyc Rejected",
        template: kycRejectionTemplate({
          firstName,
          status,
        }),
      };
    }

    case "send-login-email": {
      const { firstName, lastName, date, device } = data as LoginEmailProps;
      return {
        subject: "Login Activity Detected on Your Account",
        template: loginEmailTemplate({
          firstName,
          lastName,
          date,
          device,
        }),
      };
    }

    case "send-admin-welcome-email": {
      const { firstName, lastName, otp } = data as AdminWelcomeEmailProps;
      return {
        subject: "Welcome to Ethereal Admin",
        template: adminWelcomeEmailTemplate({
          firstName,
          lastName,
          otp,
        }),
      };
    }

    case "send-change-password-email": {
      const { firstName, lastName } = data as ChangePasswordEmailProps;
      return {
        subject: "Password Changed",
        template: changePasswordEmailTemplate({
          firstName,
          lastName,
        }),
      };
    }

    case "send-forgot-password-email": {
      const { firstName, lastName, id, otp } = data as ForgotPasswordEmailProps;
      return {
        subject: "Forgot Password",
        template: forgotPasswordEmailTemplate({
          firstName,
          lastName,
          otp,
          id,
        }),
      };
    }

    case "send-admin-invite-email": {
      const { invitedBy, role, id } = data as AdminInviteEmailProps;

      return {
        subject: "Invite to Ethereal",
        template: adminInviteEmailTemplate({
          role,
          id,
          invitedBy,
        }),
      };
    }

    // case "send-admin-account-creation-email": {
    //   const { firstName, lastName, password, recipientEmail } =
    //     data as AdminAccountCreationEmailProps;

    //   return {
    //     subject: "Welcome to Ethereal",
    //     template: customerAccountCreationEmailTemplate({
    //       firstName,
    //       lastName,
    //       password,
    //       emailAddress: recipientEmail,
    //     }),
    //   };
    // }

    case "send-passcode-reset-email": {
      const { firstName, lastName, otp } = data as ForgotPasscodeEmailProps;
      return {
        subject: "Do Not Disclose",
        template: forgotPasscodeEmailTemplate({
          firstName,
          lastName,
          otp,
        }),
      };
    }

    default:
      throw new Error(`Unknown email type: ${type}`);
  }
}
