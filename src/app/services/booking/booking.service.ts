import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking } from '../../interfaces/booking';
import { Bookingrequest } from '../../interfaces/bookingrequest';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private readonly url='http://localhost:8080/booking'
  constructor(private readonly http:HttpClient) { }

  private headers = new HttpHeaders({
  'Accept': 'application/json',
  'Content-Type': 'application/json'
});

  setBookings(reserva:Bookingrequest):Observable<Booking>{
    return this.http.post<Booking>(`${this.url}/reservar`,reserva,{headers:this.headers,})
  }

  deleteBooking(request:Bookingrequest):Observable<Booking>{
    return this.http.delete<Booking>(`${this.url}/delete/${request.idSesion}/${request.idUser}`)
  }
}
