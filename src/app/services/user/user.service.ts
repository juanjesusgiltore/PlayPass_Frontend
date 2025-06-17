import { User } from './../../interfaces/user';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private readonly url="http://localhost:8080/user"

  

  user!:User;

  constructor(private readonly http:HttpClient) { }

  getUser(id:number):Observable<User>{
    return this.http.get<User>(`${this.url}/${id}`)
  }

  getListUsers():Observable<User[]>{
    return this.http.get<User[]>(`${this.url}/admin/users`)
  }

  setUpdateUser(user:User):Observable<User>{
    return this.http.put<User>(`${this.url}/update`,user)
  }

  deleteUser(id:number):Observable<User>{
    return this.http.delete<User>(`${this.url}/admin/${id}`)
  }

  setUser(user:User){
    this.user=user;
  }

  getLocalUser():User{
    return this.user;
  }
}
