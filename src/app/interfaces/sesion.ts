import { Booking } from "./booking";

export interface Sesion {
  id: number;

  date: string;

  time: string;

  places: number;

  bookings: Booking[];
}
