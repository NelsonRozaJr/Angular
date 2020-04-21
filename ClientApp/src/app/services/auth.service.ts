// Generated through command line
// PM> cd .\ClientApp\src\app\services
// PM> ng generate service auth

import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jwtHelperService = new JwtHelperService();
  private decodedToken: any;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  login(model: any) {
    return this.http.post(`${ this.baseUrl }api/users/login`, model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          this.decodedToken = this.jwtHelperService.decodeToken(user.token);
        }
      })
    );
  }

  register(user: User) {
    return this.http.post(`${this.baseUrl}api/users/register`, user);
  }

  isAutheticated() {
    const token = localStorage.getItem('token');
    return !this.jwtHelperService.isTokenExpired(token);
  }
}
