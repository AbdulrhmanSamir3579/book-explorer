import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { catchError, throwError } from 'rxjs';
import {AuthService} from '../../features/auth/auth.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const snackBar = inject(MatSnackBar);
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error) => {
      let errorMessage = 'An unknown error occurred';

      if (error.error instanceof ErrorEvent) {
        errorMessage = `Error: ${error.error.message}`;
      } else {
        switch (error.status) {
          case 401:
            authService.logout();
            router.navigate(['/login']);
            errorMessage = 'Session expired. Please login again.';
            break;
          case 404:
            errorMessage = 'Resource not found';
            break;
          case 500:
            errorMessage = 'Server error occurred';
            break;
          default:
            errorMessage = error.error?.message || error.message;
        }
      }

      snackBar.open(errorMessage, 'Close', { duration: 5000 });
      return throwError(() => error);
    })
  );
};
