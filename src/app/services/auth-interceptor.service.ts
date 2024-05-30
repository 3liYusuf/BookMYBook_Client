import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { exhaustMap, Observable, take } from "rxjs";
import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";
import { apiUrls } from "../api.urls";
@Injectable({
    providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor{
    constructor(public authService:AuthService,public http:HttpClient){}
    intercept(req: HttpRequest<any>, next: HttpHandler) { 
        if(localStorage['access_token']){
            const authReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${localStorage['access_token']}`
              }
            });
            return next.handle(authReq);
        }else{
            return next.handle(req);
        }
        
    }
        
}