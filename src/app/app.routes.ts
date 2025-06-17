import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PasswordComponent } from './components/password/password.component';
import { HomeComponent } from './components/layout/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { BookingComponent } from './components/booking/booking.component';
import { authGuard } from './guards/auth/auth.guard';
import { roleGuard } from './guards/role/role.guard';
import { AdminComponent } from './components/admin/admin.component';
import { HomeLoginComponent } from './components/layout/home-login/home-login.component';
import { redirectGuard } from './guards/redirect/redirect.guard';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { FormcardsComponent } from './components/formcards/formcards.component';

export const routes: Routes = [
    {
        path:'',
        component:HomeComponent,
        canActivate:[redirectGuard],

    },
    {
        path:'about-us',
        component:AboutusComponent,
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
        path:'shop',
        component:FormcardsComponent,
        canActivate:[authGuard],
    },
    {
        path:'admin',
        component:AdminComponent,
        canActivate:[authGuard,roleGuard],
        data: { expectedRole: 'ADMIN' }
    }


];
