import { Image } from "./image.model";
import { Location } from "./location.model";

export interface Item {
  id: string;
  name: string;
  description?: string;
  slug: string;
  location: Location;
  image: Image;
  locationId?: number;
  dateTime: Date;
  price: number;
}
