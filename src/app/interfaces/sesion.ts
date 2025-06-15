import { Booking } from "./booking";

export interface Sesion {
  id: number;

  LocalDate: string;

  LocalTime: string;

  places: number;

  bookings: Booking[];
}
