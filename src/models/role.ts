import mongoose from "mongoose";
import { AccountDocument } from "../types/account";

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

roleSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

roleSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export const RoleModel = mongoose.model<AccountDocument>("Role", roleSchema);
