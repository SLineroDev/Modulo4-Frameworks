import { Component } from '@angular/core';

import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form: FormGroup;

  constructor(
    fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.authService.login(this.username.value, this.password.value)) {
        this.router.navigate(['/dashboard']);
      } else {
        alert('Login incorrecto. \n Pss... User: master Password: 12');
      }
    }
  }

  get username() {
    return this.form.get('username') as FormControl;
  }

  get password() {
    return this.form.get('password') as FormControl;
  }
}
