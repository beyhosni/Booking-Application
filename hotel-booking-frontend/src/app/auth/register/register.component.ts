// src/app/auth/register.component.ts

import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    const userData = {
      email: this.email,
      password: this.password,
    };

    this.authService.register(userData).subscribe(
      (response) => {
        console.log('Registration successful', response);
        // Redirige l'utilisateur ou fais d'autres actions après l'inscription
      },
      (error) => {
        console.error('Registration failed', error);
      }
    );
  }
}
