import { LoginService } from './../../services/login.service';
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
import { finalize } from 'rxjs';
import { Login } from '../../interfaces/login';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';


@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    InputGroupModule,
    InputTextModule,
    InputGroupAddonModule,
    FloatLabelModule,
    PasswordModule,
    ButtonModule,
    Toast,
    
  ],
  providers: [MessageService],

  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  formGroup!: FormGroup;

  loading: boolean = false;

  constructor(
    private readonly loginService: LoginService,
    private readonly fb: FormBuilder,
    private readonly messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      username:new FormControl(null,[Validators.required]),
      password:new FormControl(null,[Validators.required]),
    });
  }

  login() {
    if (this.formGroup.valid) {
      this.loading = true;
      let usuario:Login=this.formGroup.value;

      this.loginService
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
    }
  }
}
