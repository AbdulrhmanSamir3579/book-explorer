import { Component, DestroyRef, computed, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    NgIf
  ]
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private destroyRef = inject(DestroyRef);

  loginForm = this.fb.group({
    email: ['eve.holt@reqres.in', [Validators.required, Validators.email]],
    password: ['cityslicka', [Validators.required, Validators.minLength(6)]]
  });

  hidePassword = true;
  isLoading = computed(() => this.authService.isLoading());
  error = computed(() => this.authService.error());

  constructor() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;
    this.authService.login({ email: email!, password: password! })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        error: () => this.showErrorSnackbar()
      });
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  getEmailError(): string {
    if (this.email?.hasError('required')) return 'Email is required';
    if (this.email?.hasError('email')) return 'Please enter a valid email';
    return '';
  }

  getPasswordError(): string {
    if (this.password?.hasError('required')) return 'Password is required';
    if (this.password?.hasError('minlength')) return 'Password must be at least 6 characters';
    return '';
  }

  private showErrorSnackbar(): void {
    this.snackBar.open('Login failed. Please try again.', 'Dismiss', {
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }
}
