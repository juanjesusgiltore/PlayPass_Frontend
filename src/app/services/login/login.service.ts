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

    private readonly registerUrl:string='http://localhost:8080/auth/register';


  private readonly tokenKey:string='token';
  private readonly tokenRefreshKey:string='tokenRefresh';

  private readonly roleKey:string = 'role';

  constructor(private readonly http:HttpClient,private readonly router: Router) { }

  login(credentials:Login):Observable<Token>{

    return this.http.post<Token>(this.loginUrl,credentials);
  }

  register(credentials:Register):Observable<string>{
    return this.http.post<string>(this.registerUrl,credentials)
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
