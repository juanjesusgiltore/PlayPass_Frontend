import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PasswordComponent } from './components/password/password.component';
import { HomeComponent } from './components/layout/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BookingComponent } from './components/booking/booking.component';
import { authGuard } from './guards/auth/auth.guard';
import { roleGuard } from './guards/role/role.guard';
import { AdminComponent } from './components/admin/admin.component';
import { HomeLoginComponent } from './components/layout/home-login/home-login.component';

export const routes: Routes = [
    {
        path:'',
        component:HomeComponent
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'password',
        component:PasswordComponent
    },
    {
        path:'register',
        component:RegisterComponent
    },

    {
        path:'profile',
        component:ProfileComponent,
        canActivate:[authGuard],

    },
    {
        path:'home',
        component:HomeLoginComponent,
        canActivate:[authGuard],


    },
    {
        path:'booking',
        component:BookingComponent,
        canActivate:[authGuard],
    },
    {
        path:'admin',
        component:AdminComponent,
        canActivate:[authGuard,roleGuard],
        data: { expectedRole: 'ADMIN' }
    }


];
