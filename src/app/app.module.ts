import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';

import {
  AppRoutingModule,
  CustomThemeModule
} from './modules';

import { LoaderComponent } from './components';

import {
  InterceptorService
} from './services';

import {
  HomeComponent,
  LoginComponent,
  RegisterComponent
} from './pages';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    // component pages below here
    HomeComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    CustomThemeModule,
    BrowserAnimationsModule
  ],
  providers: [
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
