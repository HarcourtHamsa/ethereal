import mongoose from "mongoose";
import { RoomAmenity, RoomAvailability } from "../types/room";

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  amenities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Amenity",
    },
  ],
  images: [
    {
      type: String,
      required: true,
    },
  ],
  status: {
    type: String,
    enum: Object.values(RoomAvailability),
    default: RoomAvailability.Available,
  },
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel",
    required: true,
  },
});

roomSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

roomSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
  },
});

export const RoomModel = mongoose.model("Room", roomSchema);
