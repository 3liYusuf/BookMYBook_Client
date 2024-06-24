import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { ResetComponent } from './pages/reset/reset.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './guards/auth.guard'; // Import the AuthGuard
import { NoAuthGuard } from './guards/no-auth.guard'; // Import the NoAuthGuard

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [NoAuthGuard] },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: 'forget-password',
    component: ForgetPasswordComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: 'reset/:token',
    component: ResetComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'home', pathMatch: 'full' }, // Optional: Add this for handling undefined routes
    ],
  },
  { path: '', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
