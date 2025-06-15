import { Sesion } from './../../interfaces/sesion';
import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../layout/footer/footer.component';
import { MenubarComponent } from '../layout/menubar/menubar.component';
import { TabsModule } from 'primeng/tabs';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { ActivityService } from '../../services/activity/activity.service';
import { Activity } from '../../interfaces/activity';
import { ReservedcardComponent } from '../reservedcard/reservedcard.component';

@Component({
  selector: 'app-booking',
  imports: [
    FooterComponent,
    MenubarComponent,
    TabsModule,
    ConfirmDialogModule,
    MultiSelectModule,
    ReservedcardComponent,
  ],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css',
})
export class BookingComponent implements OnInit {
  tabs: { title: string; value: number; content: any[] }[] = [];

  titulosUsados = new Set<string>();

  constructor(private readonly activityService: ActivityService) {}

  activities: Activity[] = [];

  ngOnInit(): void {
    this.activities = this.activityService.getActivitysLocal();
    if (this.activities == null || this.activities.length === 0) {
      this.activityService.getActivitys().subscribe({
        next: (response) => {
          this.activities = response;
        },
      });
    } else {
    }
  }

  actualizarTabs(activity: any) {
  let sesiones: Sesion[] = activity.value[0].sesions;

  let sesionesPorDia = new Map<string, { hour: string; places: number }[]>();

  for (let sesion of sesiones) {
    let fecha = new Date(sesion.date);
    let dia = fecha.getDate().toString(); 
    let hora = sesion.time.substring(0, 5);

    if (!sesionesPorDia.has(dia)) {
      sesionesPorDia.set(dia, []);
    }

    sesionesPorDia.get(dia)!.push({
      hour: hora,
      places: sesion.places,
    });
  }

  this.tabs = [];
  let i = 0;
  for (let [dia, sesionesDia] of sesionesPorDia.entries()) {
    this.tabs.push({
      title: dia,
      value: i++,
      content: sesionesDia,
    });
  }
}
}
