import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly loginUrl:string='http//localhost:8080/login';

  constructor(private readonly http:HttpClient) { }

  login(credentials:Login):Observable<string>{

    return this.http.post<string>(this.loginUrl,credentials);
  }
}
