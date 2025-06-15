import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';


@Component({
  selector: 'app-reservedcard',
  imports: [CardModule,],
  templateUrl: './reservedcard.component.html',
  styleUrl: './reservedcard.component.css'
})
export class ReservedcardComponent {
  @Input()
  hour!:string;
  @Input()
  places!:number
}
