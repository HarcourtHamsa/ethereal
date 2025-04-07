import { AccountRole } from "./types/account";
import { AmenityFacility } from "./types/amenity";

export const DEFAULT_REDIS_QUEUE = "DEFAULT_ETHERAL_QUEUE";

export const DEFAULT_ROLES = [
  {
    name: AccountRole.Admin,
  },
  {
    name: AccountRole.User,
  },
];

export const DEFAULT_AMENITIES = [
  {
    name: "Wifi",
    facility: AmenityFacility.Room,
  },
  {
    name: "Air Conditioning",
    facility: AmenityFacility.Room,
  },
  {
    name: "Breakfast",
    facility: AmenityFacility.Hotel,
  },
  {
    name: "Parking",
    facility: AmenityFacility.Hotel,
  },
  {
    name: "Pool",
    facility: AmenityFacility.Hotel,
  },
  {
    name: "Spa",
    facility: AmenityFacility.Hotel,
  },
  {
    name: "Gym",
    facility: AmenityFacility.Hotel,
  },
  {
    name: "Restaurant",
    facility: AmenityFacility.Hotel,
  },
  {
    name: "Air Conditioning",
    facility: AmenityFacility.Room,
  },
  {
    name: "TV",
    facility: AmenityFacility.Room,
  },
  {
    name: "Daily Housekeeping",
    facility: AmenityFacility.Hotel,
  },
  {
    name: "Balcony or Terrace",
    facility: AmenityFacility.Room,
  },
  {
    name: "Work Desk",
    facility: AmenityFacility.Room,
  },
  {
    name: "Water Heater",
    facility: AmenityFacility.Room,
  },
  {
    name: "Airport Shuttle",
    facility: AmenityFacility.Hotel,
  },
  {
    name: "Laundry Service",
    facility: AmenityFacility.Hotel,
  },
  {
    name: "Conference Room",
    facility: AmenityFacility.Hotel,
  },
];
