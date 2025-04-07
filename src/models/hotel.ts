import mongoose from "mongoose";
import { HotelAmenity, HotelStatus } from "../types/hotel";

const hotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    contactInfo: {
      type: String,
      required: true,
    },
    starRating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(HotelStatus),
      default: HotelStatus.Pending,
    },
    amenities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Amenity",
      },
    ],
    rooms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
      },
    ],
    images: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

hotelSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

hotelSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
  },
});

export const HotelModel = mongoose.model("Hotel", hotelSchema);
