import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { confirmPasswordValidator } from 'src/app/validators/confirm-password.validator';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss'],
})
export class ResetComponent implements OnInit {
  resetForm!: FormGroup;
  token!: any;

  constructor(
    public fb: FormBuilder,
    public route: ActivatedRoute,
    public router: Router,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((val) => {
      this.token = val['token'];
    });
    this.resetForm = this.fb.group(
      {
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      { validator: confirmPasswordValidator('password', 'confirmPassword') }
    );
  }

  reset() {
    let resetObj = {
      token: this.token,
      password: this.resetForm.value.password,
    };

    this.authService.resetPasswordService(resetObj).subscribe({
      next: (res) => {
        console.log('res:', res);

        alert(res.message);
        this.router.navigate(['login']);
      },
      error: (err) => {
        console.log('err:', err);

        alert(err.error.message);
      },
    });
  }
}
