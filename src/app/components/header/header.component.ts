import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn:boolean = false;

  constructor(public authService:AuthService, public router:Router){}
  ngOnInit(): void {
      this.authService.isLoggedIn$.subscribe(res=>{
        this.isLoggedIn = this.authService.isLoggedIn()
      })
  }

  logout(){
    document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; //to delete cookie
    this.authService.isLoggedIn$.next(false);
    this.router.navigate(['login'])
  }

}
