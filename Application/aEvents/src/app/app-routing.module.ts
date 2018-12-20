import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {LoginPageComponent} from './login-page/login-page.component';
import {RegistrationPageComponent} from './registration-page/registration-page.component';
import {WelcomePageComponent} from './welcome-page/welcome-page.component';
import {FinishProfileComponent} from './finish-profile/finish-profile.component';

const routes: Routes = [
  {path:'', component: WelcomePageComponent},
  {path: 'login-page', component: LoginPageComponent},
  {path: 'registration-page', component:RegistrationPageComponent},
  {path: 'finish-profile-page', component: FinishProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
