export type EmailType =
  | "send-welcome-email"
  | "send-admin-welcome-email"
  | "send-forgot-password-email"
  | "send-change-password-email"
  | "send-admin-invite-email"
  | "send-admin-account-creation-email"
  | "send-passcode-reset-email"
  | "send-login-email"
  | "send-kyc-rejection-email"
  | "send-kyc-approval-email";

export type EmailProps =
  | WelcomeEmailProps
  | ForgotPasswordEmailProps
  | ChangePasswordEmailProps
  | AdminInviteEmailProps
  | AdminWelcomeEmailProps
  | AdminAccountCreationEmailProps
  | ForgotPasscodeEmailProps
  | LoginEmailProps
  | KycStatusEmailProps;

export interface WelcomeEmailProps {
  firstName: string;
  lastName: string;
  otp: string;
  recipientEmail: string;
}

export interface KycStatusEmailProps {
  firstName: string;
  status: string;
  recipientEmail: string;
}

export interface LoginEmailProps {
  firstName: string;
  lastName: string;
  date: string;
  recipientEmail: string;
  device: string;
}

export interface ForgotPasscodeEmailProps {
  firstName: string;
  lastName: string;
  otp: string;
  recipientEmail: string;
}

export interface AdminAccountCreationEmailProps {
  firstName: string;
  lastName: string;
  password: string;
  recipientEmail: string;
}

export interface AdminWelcomeEmailProps {
  firstName: string;
  lastName: string;
  otp: string;
  recipientEmail: string;
}

export interface AdminInviteEmailProps {
  invitedBy: string;
  role: string;
  id: string;
  recipientEmail: string;
}

export interface ChangePasswordEmailProps {
  firstName: string;
  lastName: string;
  recipientEmail: string;
}

export interface ForgotPasswordEmailProps {
  firstName: string;
  lastName: string;
  otp: string;
  id: string;
  recipientEmail: string;
}
