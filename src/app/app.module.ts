import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { ResetComponent } from './pages/reset/reset.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegisterComponent } from './pages/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BookCardComponent } from './components/book-card/book-card.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ResetComponent,
    ForgetPasswordComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    BookCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
