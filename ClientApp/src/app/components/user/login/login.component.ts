// Generated through command line
// PM> cd .\ClientApp\src\app\components\user
// PM> ng generate component login

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private model: any = {};

  constructor(private toastr: ToastrService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') !== null) {
      this.router.navigate(['/dashboard']);
    }
  }

  login() {
    this.authService.login(this.model).subscribe(
      () => {
        this.router.navigate(['/dashboard']);
        this.toastr.success('Autenticado com sucesso.');
      },
      error => {
        this.toastr.error(`Ocorreu uma falha no login: ${error.message}`);
      }
    )
  }
}
