import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { User } from '../../interfaces/user';
import {
  FormGroup,
  ReactiveFormsModule,
  FormBuilder,
  FormControl,
} from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { InputNumber } from 'primeng/inputnumber';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-dialog',
  imports: [
    DialogModule,
    ReactiveFormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    FloatLabelModule,
    PasswordModule,
    ButtonModule,
    InputNumber,
    SelectModule,
    DatePickerModule,
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
})
export class DialogComponent implements OnChanges {
  @Input()
  user!: User;

  @Input()
  visible: boolean = false;

  @Output()
  isVisible: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  modifiUser: EventEmitter<User> = new EventEmitter<User>();

  role = ['USER', 'ADMIN'];

  modelSesions = ['S', 'M', 'L'];

  formGroup!: FormGroup;

  constructor(
    private readonly fb: FormBuilder //private readonly messageService: MessageService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user'] && this.user) {
      console.log(this.user)
      let creditCard = this.user.creditCard ?? {
      id: 0.1,
      cardHolderName: '',
      cardNumber: '',
      expirationDate: '',
      cvv: '',
    };
      this.formGroup = this.fb.group({
        id: new FormControl(this.user.id ?? ''),
        email: new FormControl(this.user.email ?? ''),
        password: new FormControl(this.user.password ?? ''),
        name: new FormControl(this.user.name ?? ''),
        phone: new FormControl(this.user.phone ?? ''),
        modelSesion: new FormControl(this.user.modelSesion ?? ''),
        aviableSesions: new FormControl(this.user.aviableSesions ?? ''),
        role: new FormControl(this.user.role ?? ''),

        idCard: new FormControl(creditCard.id ?? 0.1),
        cardHolderName: new FormControl(creditCard.cardHolderName ?? ''),
        cardNumber: new FormControl(creditCard.cardNumber ?? ''),
        expirationDate: new FormControl(creditCard.expirationDate ?? ''),
        cvv: new FormControl(creditCard.cvv ?? ''),
        
      });
    }
  }

  changeVisible(flag: boolean) {
    this.isVisible.emit(flag);
  }

  save() {
    let formValues = this.formGroup.value;
    let updatedUser: User = {
      id: formValues.id,
      email: formValues.email,
      password: formValues.password,
      name: formValues.name,
      phone: formValues.phone,
      modelSesion: formValues.modelSesion,
      aviableSesions: formValues.aviableSesions,
      role: formValues.role,
      creditCard: {
        id: formValues.idCard,
        cardHolderName: formValues.cardHolderName,
        cardNumber: formValues.cardNumber,
        expirationDate: formValues.expirationDate,
        cvv: formValues.cvv,
      }
    };
    this.changeVisible(false);
    this.modifiUser.emit(updatedUser);
  }
}
