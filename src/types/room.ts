export enum RoomAmenity {
  TV = "TV",
  AirConditioning = "Air Conditioning",
  MiniBar = "Mini Bar",
  Safe = "Safe",
  FreeWiFi = "Free Wi-Fi",
  Refrigerator = "Refrigerator",
  CoffeeMaker = "Coffee Maker",
  HairDryer = "Hair Dryer",
  IronAndIroningBoard = "Iron and Ironing Board",
  BathrobeAndSlippers = "Bathrobe and Slippers",
  DailyHousekeeping = "Daily Housekeeping",
  TwentyFourHourRoomService = "24-Hour Room Service",
  BalconyOrTerrace = "Balcony or Terrace",
  PrivateEntrance = "Private Entrance",
  SofaBed = "Sofa Bed",
  WorkDesk = "Work Desk",
  SafeDepositBox = "Safe Deposit Box",
  Soundproofing = "Soundproofing",
  SmokeFreeRoom = "Smoke-Free Room",
  NonSmokingRoom = "Non-Smoking Room",
  WaterHeater = "Water Heater",
}

export enum RoomAvailability {
  Available = "Available",
  Booked = "Booked",
  Maintenance = "Maintenance",
  OutOfOrder = "Out of Order",
}

export interface IRoom {
  name: string;
  description: string;
  price: number;
  number: number;
  amenities: RoomAmenity[];
  images: string[];
  status: RoomAvailability;
  hotel: string;
}
