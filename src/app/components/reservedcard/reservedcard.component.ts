import { BookingService } from './../../services/booking/booking.service';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Booking } from '../../interfaces/booking';
import { TokenResponse } from '../../interfaces/token-response';
import { jwtDecode } from 'jwt-decode';
import { Bookingrequest } from '../../interfaces/bookingrequest';
import { Toast } from 'primeng/toast';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-reservedcard',
  imports: [CardModule, ConfirmDialogModule, ButtonModule, Toast],
  providers: [ConfirmationService, MessageService],
  templateUrl: './reservedcard.component.html',
  styleUrl: './reservedcard.component.css',
})
export class ReservedcardComponent implements OnChanges {
  @Input()
  hour!: string;
  @Input()
  places!: number;
  @Input()
  idSesion!: number;
  @Input()
  bookings!: Booking[];

  user!: User;

  reservado: boolean | undefined = false;

  token = localStorage.getItem('token');

  constructor(
    private readonly confirmationService: ConfirmationService,
    private readonly bookingService: BookingService,
    private readonly userService: UserService,
    private readonly messageService: MessageService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['bookings']) {
      this.user = this.userService.getLocalUser();
      let flag = this.bookings.find((b) =>
        this.user.bookings?.some((ub) => ub.id === b.id)
      );

      if (flag) {
        this.reservado = true;
      } else {
        this.reservado = false;
      }
    }
  }

  open(event: Event) {
    if (this.token) {
      let flag = this.bookings.find((b) =>
        this.user.bookings?.some((ub) => ub.id === b.id)
      );
      if (flag) {
        this.eliminar(event, flag.id);
      } else {
        this.reservar(event, this.user.id);
      }
    }
  }

  reservar(event: Event, userId: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: '¿Quieres reservar?',
      header: 'Confirmacion',
      closable: true,
      closeOnEscape: true,
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Sí',
      },
      accept: () => {
        let bookingRequest: Bookingrequest = {
          idSesion: this.idSesion,
          idUser: userId,
        };
        this.bookingService.setBookings(bookingRequest).subscribe({
          next: (response) => {
            this.places--;
            this.reservado = true;
          },

          error: (err) => {
            let error = err.error.error;
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: error,
              life: 3000,
            });
          },
        });
      },
      reject: () => {},
    });
  }

  eliminar(event: Event, userId: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: '¿Quieres cancelar la reserva?',
      header: 'Danger Zone',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger',
      },

      accept: () => {
        let bookingRequest: Bookingrequest = {
          idSesion: this.idSesion,
          idUser: userId,
        };
        this.bookingService.deleteBooking(bookingRequest).subscribe({
          next: (response) => {
            this.reservado = false;
            this.places++;
          },
          error: (err) => {},
        });
      },
      reject: () => {},
    });
  }
}
