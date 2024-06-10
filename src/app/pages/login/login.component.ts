import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { confirmPasswordValidator } from 'src/app/validators/confirm-password.validator';
interface registerForm {
  firstName:string;
  lastName:string;
  email:string;
  userName:string;
  password:string;
  confirmPassword:string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  userData:any;
  constructor(public authService: AuthService, public fb: FormBuilder, public router:Router, private route: ActivatedRoute) {}
  ngOnInit(): void {
    if(this.authService.registerData){
      this.loginForm = this.fb.group({
        email: [this.authService.registerData.email, Validators.compose([Validators.required, Validators.email])],
        password: [this.authService.registerData.password, Validators.required],
      });
    }else{
      this.loginForm = this.fb.group({
        email: ['', Validators.compose([Validators.required, Validators.email])],
        password: ['', Validators.required],
      });
    }
  }

  login() {
    this.authService.loginService(this.loginForm.value).subscribe({
      next: (res) => {
        console.log('res:',res);
        
        alert('Logged In!');

        // document.cookie = `access_token=${res.token}; path=/`;
// login.component.ts or wherever you handle login
        localStorage.setItem('access_token', res.token);


        this.authService.isLoggedIn$.next(true);
        this.router.navigate(['home']);
      },
      error: (err) => {
        console.log(err.error.message);
      },
    });
  }
}
