import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginPageComponent } from './login-page/login-page.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AlertModule} from 'ngx-bootstrap';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { FinishProfileComponent } from './finish-profile/finish-profile.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    WelcomePageComponent,
    RegistrationPageComponent,
    FinishProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AlertModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
