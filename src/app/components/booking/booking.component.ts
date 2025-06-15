import { Component } from '@angular/core';
import { FooterComponent } from '../layout/footer/footer.component';
import { MenubarComponent } from '../layout/menubar/menubar.component';

@Component({
  selector: 'app-booking',
  imports: [FooterComponent,MenubarComponent],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {

}
