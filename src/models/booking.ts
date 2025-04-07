import mongoose from "mongoose";
import { BookingStatus, PaymentStatus } from "../types/booking";

const bookingSchema = new mongoose.Schema(
  {
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    checkInDate: {
      type: Date,
      required: true,
    },
    checkOutDate: {
      type: Date,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: Object.values(PaymentStatus),
      default: PaymentStatus.Pending,
    },
    bookingStatus: {
      type: String,
      enum: Object.values(BookingStatus),
      default: BookingStatus.Pending,
    },
    cancellationReason: {
      type: String,
    },
  },
  { timestamps: true }
);

bookingSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

bookingSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
  },
});

export const BookingModel = mongoose.model("Booking", bookingSchema);
