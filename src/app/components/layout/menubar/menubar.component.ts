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

  menuItems: MenuItem[] = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      routerLink: '/',
    },
    {
      label: 'Actividades',
      icon: 'pi pi-list',
      items: [
        {
          label: '',
        },
      ],
    },
    {
      label: 'Sobre Nosotros',
      icon: 'pi pi-star',
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

  constructor(private readonly loginService:LoginService){}

  ngOnInit(): void {
    this.items = this.menuItems;
    this.itemUserFinal = this.itemUserSinLogin;
    this.itemUserFinalLogin = [
      {
        label: 'Perfil',
        icon: 'pi pi-user',
        items: [
          {
            label: 'Perfil',
            routerLink:'/profile'
          },
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
