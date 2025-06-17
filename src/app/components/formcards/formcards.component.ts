import { CreditCard } from './../../interfaces/credit-card';
import { UserService } from './../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';

import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { Router } from '@angular/router';
import { FooterComponent } from '../layout/footer/footer.component';
import { MenubarComponent } from '../layout/menubar/menubar.component';

@Component({
  selector: 'app-formcards',
  imports: [
    ReactiveFormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    FloatLabelModule,
    ButtonModule,
    SelectModule,
    FooterComponent,
    MenubarComponent,
    DatePickerModule
],
  templateUrl: './formcards.component.html',
  styleUrl: './formcards.component.css',
})
export class FormcardsComponent implements OnInit {
  modelSesions = ['S-8', 'M-14', 'L-32'];

  formGroup!: FormGroup;

  minDate!:Date;


  constructor(private readonly fb: FormBuilder,private readonly userService:UserService,private readonly route:Router) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      modelSesion: new FormControl(null,[Validators.required]),
      cardHolderName: new FormControl(null,[Validators.required]),
      cardNumber: new FormControl(null,[Validators.required]),
      expirationDate: new FormControl(null,[Validators.required]),
      cvv: new FormControl(null,[Validators.required]),
    });

    const hoy = new Date();
    this.minDate = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
    
  }

  save() {
    let user=this.userService.getLocalUser();
    let data=this.formGroup.value;
    let sesions=Number(data.modelSesion.split('-')[1])
    let credit:CreditCard={
      cardHolderName:data.cardHolderName,
      cardNumber:data.cardNumber,
      cvv:data.cvv,
      expirationDate:data.expirationDate,
    }
    user.modelSesion=data.modelSesion.split('-')[0];
    user.creditCard=credit;
    user.aviableSesions=user.aviableSesions+sesions;
    
    this.userService.setUpdateUser(user).subscribe({
      next:(response)=>{
          this.userService.setUser(response);
          this.route.navigate(['/home'])
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
}
