import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrls } from '../api.urls';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn$= new BehaviorSubject<boolean>(false);
  constructor(public http: HttpClient) {}
  registerService(registerObj: any) {
    return this.http.post<any>(`${apiUrls.authServiceApi}`, registerObj);
  }

  loginService(loginObj: any) {
    return this.http.post<any>(`${apiUrls.authServiceApi}` + 'login', loginObj);
  }

  sendEmailService(email: any) {
    return this.http.post<any>(`${apiUrls.authServiceApi}` + 'send-email', {
      email: email,
    });
  }

  resetPasswordService(resetObj: any) {
    return this.http.post<any>(
      `${apiUrls.authServiceApi}` + 'reset-password',
      resetObj
    );
  }

  isLoggedIn() {
    return !!localStorage.getItem('user_id');
  }
}
