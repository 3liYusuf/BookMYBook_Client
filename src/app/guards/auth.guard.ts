import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isLoggedIn = this.authService.isLoggedIn();
    const isLoginRoute = state.url === '/login';

    if (isLoggedIn && isLoginRoute) {
      // If the user is logged in and trying to access the login page, redirect to home
      this.router.navigate(['/home']);
      return false;
    } else if (!isLoggedIn && !isLoginRoute) {
      // If the user is not logged in and trying to access a protected route, redirect to login
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
