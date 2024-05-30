import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { confirmPasswordValidator } from 'src/app/validators/confirm-password.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  constructor(public authService: AuthService, public fb: FormBuilder, public router:Router) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    });
  }

  login() {
    this.authService.loginService(this.loginForm.value).subscribe({
      next: (res) => {
        alert('Logged In!');
        localStorage.setItem("user_id",res.data._id);
        this.authService.isLoggedIn$.next(true);
        this.router.navigate(['home']);
      },
      error: (err) => {
        console.log(err);
      },
    });
    console.log(this.loginForm.value);
  }
}
