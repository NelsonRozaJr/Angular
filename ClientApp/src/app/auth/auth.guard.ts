// Generated through command line
// PM> cd .\ClientApp\src\app\auth
// PM > ng generate guard auth

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (localStorage.getItem('token') !== null) {
      return true;
    }
    else {
      this.router.navigate(['/user/login'])
      return false;
    }
  }
}
