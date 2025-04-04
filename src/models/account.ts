import mongoose from "mongoose";
import { AccountDocument, AccountRole, AccountStatus } from "../types/account";
import bcrypt from "bcrypt";
import { generateRadomDigits } from "../utils/core";

const accountSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    emailAddress: {
      type: String,
      required: true,
      unique: [true, "Email address already exists"],
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(AccountStatus),
      default: AccountStatus.Inactive,
    },
    otpExpire: {
      type: Number,
      required: false,
    },
    otp: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

accountSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = bcrypt.hashSync(this.password, 10);
  return next();
});

accountSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

accountSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

accountSchema.methods.comparePassword = function (password: string) {
  return bcrypt.compareSync(password, this.password);
};

accountSchema.methods.compareOtp = async function (otp: string) {
  const otpInDB = this.otp;
  const otpExpire = this.otpExpire as number;

  if (otpInDB === otp) {
    const currentTimestamp = Date.now();

    if (currentTimestamp > otpExpire) {
      return [false, "Otp has expired"];
    }

    // Unset the otp and otpExpire fields
    this.set("otp", undefined);
    this.set("otpExpire", undefined);

    await this.save();

    return [true, "Otp verified"];
  }

  return [false, "Otp does not match"];
};

accountSchema.methods.generateOtp = async function () {
  const otp = generateRadomDigits(6);

  this.otp = otp;
  this.otpExpire = Date.now() + 10 * 60 * 1000;

  await this.save();
  return otp;
};

export const AccountModel = mongoose.model<AccountDocument>(
  "Account",
  accountSchema
);
