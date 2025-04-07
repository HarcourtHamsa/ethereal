export enum PaymentStatus {
  Pending = "Pending",
  Paid = "Paid",
  Refunded = "Refunded",
  Failed = "Failed",
}

export enum BookingStatus {
  Confirmed = "Confirmed",
  Cancelled = "Cancelled",
  Completed = "Completed",
  NoShow = "No-Show",
  Pending = "Pending",
}

export interface IBooking {
  room: string;
  user: string;
  checkInDate: Date;
  checkOutDate: Date;
  paymentStatus: PaymentStatus;
  bookingStatus: BookingStatus;
}
