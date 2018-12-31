import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPageComponent } from './login-page/login-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';

import { ProfilePageComponent } from './profile-page/profile-page.component';
import { CreateEventPageComponent } from './create-event-page/create-event-page.component';

const routes: Routes = [
  
  {path:'', component: LoginPageComponent},
  {path: 'registration-page', component:RegistrationPageComponent},
  {path: 'profile-page', component:ProfilePageComponent},
  {path: 'create-event-page',component:CreateEventPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
