import { Injectable, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import {HttpService} from '../../core/services/http.service';

interface AuthUser {
  email: string;
  token: string;
  loginTime: Date;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly AUTH_KEY = 'bookhub_auth';
  private _user = signal<AuthUser | null>(null);
  private _isLoading = signal(false);
  private _error = signal<string | null>(null);

  user = computed(() => this._user());
  isLoading = computed(() => this._isLoading());
  error = computed(() => this._error());
  isAuthenticated = computed(() => !!this._user());

  constructor(private http: HttpService, private router: Router) {
    this.initializeAuthState();
  }

  login(credentials: { email: string; password: string }): Observable<{ token: string }> {
    this._isLoading.set(true);
    this._error.set(null);

    return this.http.post<{ token: string }>(
      'login',
      credentials,
      true
    ).pipe(
      tap({
        next: (response: any) => this.handleLoginSuccess(response.token, credentials.email),
        error: (err) => this.handleLoginError(err)
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.AUTH_KEY);
    this._user.set(null);
    this.router.navigate(['/auth']);
  }

  private handleLoginSuccess(token: string, email: string): void {
    const authUser: AuthUser = {
      email,
      token,
      loginTime: new Date()
    };
    localStorage.setItem(this.AUTH_KEY, JSON.stringify(authUser));
    this._user.set(authUser);
    this._isLoading.set(false);
    this.router.navigate(['/dashboard']);
  }

  private handleLoginError(error: any): void {
    this._error.set(error.error?.error || 'Login failed, please try again');
    this._isLoading.set(false);
  }

  private initializeAuthState(): void {
    const storedAuth = localStorage.getItem(this.AUTH_KEY);
    if (storedAuth) {
      try {
        this._user.set(JSON.parse(storedAuth));
      } catch {
        this.logout();
      }
    }
  }
}
