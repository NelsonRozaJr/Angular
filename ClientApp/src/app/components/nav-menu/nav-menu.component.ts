import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;

  constructor(private toastr: ToastrService,
    private router: Router,
    private authService: AuthService) { }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  isAuthenticated() {
    const isAuthenticated = this.authService.isAuthenticated();
    if (!isAuthenticated && localStorage.getItem('token') !== null) {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
    }

    return isAuthenticated;
  }

  login() {
    this.router.navigate(['/user/login']);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');

    this.router.navigate(['/user/login']);
    this.toastr.show('Logout realizado com sucesso.');
  }

  getUserName() {
    return localStorage.getItem('username');
  }

  isLoginPage() {
    return this.router.url === '/user/login';
  }
}
