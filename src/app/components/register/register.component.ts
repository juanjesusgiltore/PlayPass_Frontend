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
import { Router, RouterModule } from '@angular/router';
import { InputNumberModule } from 'primeng/inputnumber';
import { LoginService } from '../../services/login/login.service';
import { finalize } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { TokenResponse } from '../../interfaces/token-response';

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
    private readonly messageService: MessageService,
    private readonly loginService: LoginService,
    private readonly route: Router
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
      let data=this.formGroup.value
      let register: Register ={
        email: data.email,
        password: data.password,
        name: data.name,
        phone: data.phone,
        Role: 'USER',
      } ;

      this.loginService
        .register(register)
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        )
        .subscribe({
          next: (response) => {
            this.loginService.setSession(response,jwtDecode<TokenResponse>(response.accesToken).role)
            this.route.navigate(['/home']);
          },

          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: err.value,
              life: 3000,
            });
          },
        });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Falta usuario o contraseña',
        life: 3000,
      });
    }
  }
}
