import { Component, OnInit } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { MenuItem } from 'primeng/api';
import { LoginService } from '../../../services/login/login.service';

@Component({
  selector: 'app-menubar',
  imports: [MenubarModule, AvatarModule],
  templateUrl: './menubar.component.html',
  styleUrl: './menubar.component.css',
})
export class MenubarComponent implements OnInit {
  items: MenuItem[] = [];
  itemUserFinalLogin: MenuItem[] = [];
  itemUserFinal: MenuItem[] = [];
  token:string|null='';
  role:string|null=''

  menuItems: MenuItem[] = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      routerLink: '/',
    },
    {
      label: 'Sobre Nosotros',
      icon: 'pi pi-star',
      routerLink:'/about-us'
    },
  ];

  itemUserSinLogin: MenuItem[] = [
    {
      label: 'Iniciar Sesión',
      routerLink: '/login',
    },
    {
      label: 'Registrate',
      routerLink: '/register',
    },
  ];

   itemAdmin: MenuItem[]=[
    {
      label: 'Admin',
      routerLink: '/admin',
    },
   ]

  constructor(private readonly loginService:LoginService){}

  ngOnInit(): void {
    this.token=localStorage.getItem('token')
    this.role=localStorage.getItem('role')
    this.items = this.menuItems;
    this.items= this.role==='ADMIN' ? this.items.concat(this.itemAdmin):this.items;
    this.itemUserFinal = this.itemUserSinLogin;
    this.itemUserFinalLogin = [
      {
        label: 'Perfil',
        icon: 'pi pi-user',
        items: [
          {
            label: 'Cerrar sesión',
            command: ()=>{
              this.loginService.logout();
            }
          },
        ],
      },
    ];
  }
}
