import { AuthInterceptor } from './interceptors/auth.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCarouselModule } from '@ngbmodule/material-carousel';
import 'hammerjs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavFrameComponent } from './components/nav-frame/nav-frame.component';
import { MaterialExporterModule } from './modules/material-exporter/material-exporter.module';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { UserPermissionsComponent } from './components/admin/user-permissions/user-permissions.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { UserRolesComponent } from './components/admin/user-roles/user-roles.component';
import { PermissionQuickviewComponent } from './components/sub/permission-quickview/permission-quickview.component';
import { RoleComponent } from './components/sub/role/role.component';
import { WebUsersComponent } from './components/admin/web-users/web-users.component';
import { RoleQuickviewComponent } from './components/sub/role-quickview/role-quickview.component';
import { UserComponent } from './components/sub/user/user.component';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';

@NgModule({
  declarations: [
    AppComponent,
    NavFrameComponent,
    RegisterComponent,
    LoginComponent,
    AdminComponent,
    UserPermissionsComponent,
    ResetPasswordComponent,
    UserRolesComponent,
    PermissionQuickviewComponent,
    RoleComponent,
    WebUsersComponent,
    RoleQuickviewComponent,
    UserComponent,
    AllProductsComponent,
    MyAccountComponent,
    ShoppingCartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialExporterModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatCarouselModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
