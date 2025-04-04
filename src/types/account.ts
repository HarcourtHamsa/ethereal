export enum AccountStatus {
  Active = "active",
  Inactive = "inactive",
}

export enum AccountRole {
  User = "User",
  Admin = "Admin",
  Vendor = "Vendor",
}

export interface IAccount {
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
  role: string | { name: AccountRole };
  status: AccountStatus;
  otpExpire?: number;
  otp?: string;
}

export interface AccountMethods {
  comparePassword(password: string): Promise<boolean>;
  compareOtp(otp: string): Promise<[boolean, string]>;
  generateOtp(): Promise<string>;
}

export type AccountDocument = IAccount & Document & AccountMethods;
