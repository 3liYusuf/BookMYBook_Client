import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { confirmPasswordValidator } from 'src/app/validators/confirm-password.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm!:FormGroup;
  constructor(public authService:AuthService, public fb:FormBuilder, public router:Router){}
  ngOnInit(): void{
    this.registerForm = this.fb.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      email:['',Validators.compose([Validators.required,Validators.email])],
      userName:['',Validators.required],
      password:['',Validators.required],
      confirmPassword:['',Validators.required],
    },{
      validator: confirmPasswordValidator('password','confirmPassword')
    })
  }

  register(){
    this.authService.registerService(this.registerForm.value).subscribe({
      next:(res)=>{
        alert("User Created!");
        this.router.navigate(['login',this.registerForm.value]);
      },error:(err)=>{
        console.log(err);
        
      }
    })
    
  }
}
