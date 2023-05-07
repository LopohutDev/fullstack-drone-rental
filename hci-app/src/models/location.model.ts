import { Image } from "./image.model";
export interface Location {
  id: string;
  name: string;
  address1: string;
  address2?: string;
  city: string;
  state?: string;
  country: string;
  image?: Image;
}

export interface CreateLocation {
  name: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  country: string;
  image?: Image;
}

export interface UpdateLocation {
  id: string;
  name: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  country: string;
}
