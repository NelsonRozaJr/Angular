// Generated through command line
// PM> cd .\ClientApp\src\app\components\user
// PM> ng generate component registration

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../models/user';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  private registerForm: FormGroup;
  private user: User

  constructor(private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.validation();
  }

  validation() {
    this.registerForm = this.formBuilder.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      userName: ['', [Validators.required]],
      passwords: this.formBuilder.group({
        password: ['', [Validators.required, Validators.minLength(4)]],
        confirmPassword: ['', [Validators.required]]
      }, { validator: this.comparePassword })
    });
  }

  comparePassword(formGroup: FormGroup) {
    const confirmPassword = formGroup.get('confirmPassword');

    if (confirmPassword.errors === null || 'mismatch' in confirmPassword.errors) {
      if (formGroup.get('password').value !== confirmPassword.value) {
        confirmPassword.setErrors({ mismatch: true });
      }
      else {
        confirmPassword.setErrors(null);
      }
    }
  }

  registerUser() {
    if (this.registerForm.valid) {
      this.user = Object.assign({ password: this.registerForm.get('passwords.password').value }, this.registerForm.value);
      this.authService.register(this.user).subscribe(
        () => {
          this.router.navigate(['/user/login']);
          this.toastr.success('Cadastro realizado com sucesso.');
        }, errors => {
          errors.error.foreach(element => {
            switch (element) {
              case 'DuplicateUserName':
                this.toastr.error('Usuário já existente.');
                break;
              default:
                this.toastr.error(`Erro ao cadastrar usuário (ErrorCode = ${ element.code })`);
                break;
            }
          });
        }
      )
    }
  }
}
