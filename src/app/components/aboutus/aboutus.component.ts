import { Component } from '@angular/core';
import { FooterComponent } from '../layout/footer/footer.component';
import { MenubarComponent } from '../layout/menubar/menubar.component';

@Component({
  selector: 'app-aboutus',
  imports: [FooterComponent,MenubarComponent],
  templateUrl: './aboutus.component.html',
  styleUrl: './aboutus.component.css'
})
export class AboutusComponent {
    team = [
    {
      name: 'Laura Martínez',
      role: 'Directora',
      bio: 'Líder apasionada con más de 15 años gestionando instalaciones deportivas públicas.',
     // photo: 'assets/team/laura.jpg',
    },
    {
      name: 'Miguel Sánchez',
      role: 'Entrenador Principal',
      bio: 'Experto en entrenamiento físico y programas de bienestar para todas las edades.',
      //photo: 'assets/team/miguel.jpg',
    },
    {
      name: 'Sara López',
      role: 'Coordinadora de Actividades',
      bio: 'Organiza actividades y eventos deportivos para fomentar la participación comunitaria.',
      //photo: 'assets/team/sara.jpg',
    },
  ];
}
