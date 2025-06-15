import { User } from './user';

export interface Booking {
  id: number;

  user: User;

  bookingDate: string;
}
