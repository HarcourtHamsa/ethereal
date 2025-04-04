export interface IAddress {
  country: string;
  city: string;
  street: string;
  state: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}
