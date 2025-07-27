import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../features/auth/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const authToken = authService.user()?.token;

  let modifiedReq = req.clone();

  if (req.url.includes('reqres.in')) {
    modifiedReq = req.clone({
      setHeaders: {
        'x-api-key': 'reqres-free-v1'
      }
    });
  }
  // else if (authToken) {
  //   modifiedReq = req.clone({
  //     setHeaders: {
  //       'Authorization': `Bearer ${authToken}`
  //     }
  //   });
  // }

  return next(modifiedReq);
};
