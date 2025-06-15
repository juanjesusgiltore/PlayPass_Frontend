import { User } from './../../interfaces/user';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private readonly url="http://localhost:8080/user"

  constructor(private readonly http:HttpClient) { }

  getUser(id:number):Observable<User>{
    return this.http.get<User>(`${this.url}/${id}`)
  }
}
