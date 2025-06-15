import { Component } from '@angular/core';
import { MenubarComponent } from '../menubar/menubar.component';
import { FooterComponent } from '../footer/footer.component';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  imports: [MenubarComponent,FooterComponent,ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private readonly router: Router) {}


  enrutar(ruta:string):void{
    this.router.navigate([ruta]);
  }
}
