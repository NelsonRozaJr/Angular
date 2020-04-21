// Generated through command line
// PM> cd .\ClientApp\src\app\auth
// PM > ng generate interceptor auth

import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/internal/operators/tap'

@Injectable({ providedIn: 'root' })

export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (localStorage.getItem('token') !== null) {
      const requestClone = request.clone({ headers: request.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`) });
      return next.handle(requestClone).pipe(
        tap(
          () => { },
          error => {
            if (error.status === 401) {
              this.router.navigate(['/user/login']);
            }
          })
      );
    }
    else {
      return next.handle(request.clone());
    }
  }
}
