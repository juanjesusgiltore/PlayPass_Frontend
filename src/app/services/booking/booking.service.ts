import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Activity } from '../../interfaces/activity';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private readonly url='http//localhost:8080/activitys'
  constructor(private readonly http:HttpClient) { }

  getSesions(activity:string):Observable<Activity>{

    return this.http.get<Activity>(`${this.url}/activitys`,)
  }
}
