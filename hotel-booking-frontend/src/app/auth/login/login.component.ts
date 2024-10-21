// src/app/auth/login.component.ts

import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    const userData = {
      email: this.email,
      password: this.password,
    };

    this.authService.login(userData).subscribe(
      (response) => {
        console.log('Login successful', response);
        // Redirige l'utilisateur ou fais d'autres actions après la connexion
      },
      (error) => {
        console.error('Login failed', error);
      }
    );
  }
}
