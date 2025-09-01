import { Injectable } from '@angular/core';
import {
  CanActivateFn,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    console.log('AuthGuard: Checking login');
console.log('Token in Guard:', localStorage.getItem('access_token'));
console.log('isLoggedIn() says:', authService.isLoggedIn());
    return true;
  }

  router.navigate(['/login'], {
    queryParams: { authError: 'unauthorized' },
  });
  return false;
};
