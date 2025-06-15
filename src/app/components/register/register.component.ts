import { Register } from './../../interfaces/register';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormBuilder,
  FormControl,
} from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { RouterModule } from '@angular/router';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-register',
  imports: [
    InputNumberModule,
    Toast,
    ReactiveFormsModule,
    InputGroupModule,
    InputTextModule,
    InputGroupAddonModule,
    FloatLabelModule,
    PasswordModule,
    ButtonModule,
    RouterModule,
  ],
  providers: [MessageService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  formGroup!: FormGroup;

  loading: boolean = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
    });
  }

  register() {
    if (this.formGroup.valid) {
      this.loading = true;
      let register: Register = this.formGroup.value;
      register.Role = 'USER';

      /*this.loginService
          .login(usuario)
          .pipe(
            finalize(() => {
              this.loading = false;
            })
          )
          .subscribe({
            next: (respone) => {},
  
            error: (err) => {
              this.messageService.add({severity:'error',summary:'Error',detail:err.value,life:3000})
            },
          });
      } else {
        this.messageService.add({severity:'error',summary:'Error',detail:'Falta usuario o contraseña',life:3000})
      }*/
    }
  }
}
