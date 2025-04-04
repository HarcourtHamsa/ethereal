export enum HotelAmenity {
  WiFi = "WiFi",
  Parking = "Parking",
  Pool = "Pool",
  Gym = "Gym",
  Restaurant = "Restaurant",
  Bar = "Bar",
  Spa = "Spa",
  RoomService = "Room Service",
  AirportShuttle = "Airport Shuttle",
  ConferenceRoom = "Conference Room",
  PetFriendly = "Pet Friendly",
}

export enum HotelStatus {
  Deleted = "Deleted",
  Review = "Review",
  Pending = "Pending",
  Approved = "Approved",
  Rejected = "Rejected",
}

export interface IHotel {
  name: string;
  address: string;
  description: string;
  contactInfo: string;
  starRating: number;
  amenities: HotelAmenity[];
  rooms: string[];
  status: HotelStatus;
  images: {
    url: string;
    caption?: string;
    isPrimary?: boolean;
  }[];
}
