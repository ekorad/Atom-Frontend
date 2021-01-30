import { AdminCanActivate } from './helpers/admin-can-activate';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { LoginCanActivate } from './helpers/login-can-activate';
import { NavFrameComponent } from './components/nav-frame/nav-frame.component';
import { UserPermissionsComponent } from './components/admin/user-permissions/user-permissions.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: NavFrameComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent, canActivate: [LoginCanActivate] },
  { path: 'reset-password', component: ResetPasswordComponent },
  {
    path: 'admin', component: AdminComponent, children: [
      { path: '', redirectTo: 'permissions', pathMatch: 'full' },
      { path: 'permissions', component: UserPermissionsComponent, data: { title: 'Permisiuni utilizatori', requiredAuthorities: ['READ_ANY_PERMISSION'] }, canActivate: [AdminCanActivate] }
    ],
    data: { requiredAuthorities: ['ELEVATED'] },
    canActivate: [AdminCanActivate]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
