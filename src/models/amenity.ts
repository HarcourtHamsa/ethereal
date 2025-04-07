import mongoose from "mongoose";
import { AmenityFacility } from "../types/amenity";

const amenitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    facility: {
      type: String,
      enum: Object.values(AmenityFacility),
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

amenitySchema.virtual("id").get(function () {
  return this._id.toHexString();
});

amenitySchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
  },
});

export const AmenityModel = mongoose.model("Amenity", amenitySchema);
