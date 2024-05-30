import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = this.authService.isLoggedIn();
    if (isLoggedIn) {
      // If the user is logged in, redirect to home page
      this.router.navigate(['/home']);
      return false;
    }
    // If the user is not logged in, allow access to the route
    return true;
  }
}
