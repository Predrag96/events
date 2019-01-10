import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NotifierModule } from 'angular-notifier';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginPageComponent } from './login-page/login-page.component';


import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AlertModule} from 'ngx-bootstrap';
import { RegistrationPageComponent } from './registration-page/registration-page.component';

import { ProfilePageComponent } from './profile-page/profile-page.component';
import { CreateEventPageComponent } from './create-event-page/create-event-page.component';

import {MatInputModule, MatToolbarModule, MatMenuModule, MatFormFieldModule, MatButtonModule ,MatSelectModule, MatOptionModule, MatDatepickerModule, MatNativeDateModule, MatCheckboxModule, MatSidenavModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { PusherService } from './pusher.service';
import { SettingsPageComponent } from './settings-page/settings-page.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegistrationPageComponent,   
    ProfilePageComponent,
    CreateEventPageComponent,
    SettingsPageComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AlertModule.forRoot(),
    NotifierModule.withConfig(),

    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,

    BrowserAnimationsModule
  ],
  providers: [PusherService],
  bootstrap: [AppComponent]
})


export class AppModule { }
