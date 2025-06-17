import { Booking } from "./booking";
import { CreditCard } from "./credit-card";

export interface User {
  id: number,

  name: string,

  email: string,

  password: string,

  phone: string,

  modelSesion:string,

  aviableSesions:number,

  creditCard:CreditCard,

  role:string,

  bookings?:Booking[]
}
