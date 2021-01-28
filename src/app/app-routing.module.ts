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
  { path: 'login', component: LoginComponent },
  {
    path: 'admin', component: AdminComponent, children: [
      { path: '', redirectTo: 'permissions', pathMatch: 'full' },
      { path: 'permissions', component: UserPermissionsComponent, data: { title: 'Permisiuni utilizatori' } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
