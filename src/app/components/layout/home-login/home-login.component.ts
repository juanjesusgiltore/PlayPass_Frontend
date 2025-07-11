import { jwtDecode } from 'jwt-decode';
import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { MenubarComponent } from '../menubar/menubar.component';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { Activity } from '../../../interfaces/activity';
import { CardModule } from 'primeng/card';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../interfaces/user';
import { ActivityService } from '../../../services/activity/activity.service';
import { TokenResponse } from '../../../interfaces/token-response';
import { Router } from '@angular/router';
import { ProgressSpinnerModule } from 'primeng/progressspinner';


@Component({
  selector: 'app-home-login',
  imports: [
    FooterComponent,
    MenubarComponent,
    CarouselModule,
    ButtonModule,
    CardModule,
    ProgressSpinnerModule,
  ],
  templateUrl: './home-login.component.html',
  styleUrl: './home-login.component.css',
})
export class HomeLoginComponent implements OnInit {
  activitys: Activity[] = [];
  responsiveOptions: any[] | undefined;

  usuario!: User;

  loading: boolean = false;


  constructor(
    private readonly userService: UserService,
    private readonly activityService: ActivityService,
    private readonly router:Router,
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');

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
   
    if (token) {
      let id: number = Number(jwtDecode<TokenResponse>(token).jti);



      this.userService.getUser(id).subscribe({
        next: (response) => {
          this.usuario = response;
          this.userService.setUser(response);
        },

        error: (err) => {
          console.log(err);
        },
      });
      if(this.activityService.getActivitysLocal().length>0){
        this.activitys =this.activityService.getActivitysLocal();
      }else{
        this.loading = true;
        this.activityService.getActivitys().subscribe({
        next: (response) => {
          this.activitys = response;
          this.activityService.setActivities(response);
          this.loading = false;
        },
        error: (err) => {
          console.log(err);
          this.loading = false;
        },
      });
    }
  }
     
  }

  reserva(activity: Activity) {
    this.router.navigate(['/booking'])
  }

  navegar(route:string) {
    this.router.navigate([route]);
  }
}
