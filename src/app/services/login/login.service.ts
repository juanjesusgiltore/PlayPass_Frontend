import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../../interfaces/login';
import { Router } from '@angular/router';
import { Register } from '../../interfaces/register';
import { Token } from '../../interfaces/token';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly loginUrl:string='http://localhost:8080/auth/login';

  private readonly logoutUrl:string='http://localhost:8080/auth/logout';


  private readonly registerUrl:string='http://localhost:8080/auth/register';

  private readonly  passwordUrl:string='http://localhost:8080/auth/password';


  private readonly tokenKey:string='token';
  private readonly tokenRefreshKey:string='tokenRefresh';

  private readonly roleKey:string = 'role';

  constructor(private readonly http:HttpClient,private readonly router: Router) { }

  login(credentials:Login):Observable<Token>{

    return this.http.post<Token>(this.loginUrl,credentials);
  }

   password(credentials:Login):Observable<Token>{

    return this.http.patch<Token>(this.passwordUrl,credentials);
  }

  register(credentials:Register):Observable<Token>{
    return this.http.post<Token>(this.registerUrl,credentials)
  }

  setSession(token: Token, role: string) {
    localStorage.setItem(this.tokenKey, token.accesToken);
    localStorage.setItem(this.tokenRefreshKey, token.refreshToken);
    localStorage.setItem(this.roleKey, role);
  }

   logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.roleKey);
    this.router.navigate(['/login']);
    this.http.post<string>(this.logoutUrl,"");
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getRole(): string | null {
    return localStorage.getItem(this.roleKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
