export enum PaymentStatus {
  Pendiing = "Pending",
  Paid = "Paid",
  Refunded = "Refunded",
  Failed = "Failed",
}

export enum BookingStatus {
  Confirmed = "Confirmed",
  Cancelled = "Cancelled",
  Completed = "Completed",
  NoShow = "No-Show",
  Pendiing = "Pending",
}

export interface IBooking {
  hotel: string;
  room: string;
  user: string;
  checkInDate: Date;
  checkOutDate: Date;
  amount: number;
  paymentStatus: PaymentStatus;
  bookingStatus: BookingStatus;
}
