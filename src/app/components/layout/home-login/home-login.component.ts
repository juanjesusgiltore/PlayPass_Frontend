import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { MenubarComponent } from '../menubar/menubar.component';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { Activity } from '../../../interfaces/activity';
import { CardModule } from 'primeng/card';


@Component({
  selector: 'app-home-login',
  imports: [FooterComponent,MenubarComponent,CarouselModule,ButtonModule,CardModule],
  templateUrl: './home-login.component.html',
  styleUrl: './home-login.component.css'
})
export class HomeLoginComponent implements OnInit {
  
  activitys:Activity[]=[];
  responsiveOptions: any[] | undefined;

  constructor(){}

  ngOnInit(): void {
      this.responsiveOptions = [
            {
                breakpoint: '1400px',
                numVisible: 2,
                numScroll: 1,
            },
            {
                breakpoint: '1199px',
                numVisible: 3,
                numScroll: 1,
            },
            {
                breakpoint: '767px',
                numVisible: 2,
                numScroll: 1,
            },
            {
                breakpoint: '575px',
                numVisible: 1,
                numScroll: 1,
            },
        ];
  }




}
