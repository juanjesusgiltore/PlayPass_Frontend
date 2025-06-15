import { LoginService } from '../../services/login/login.service';
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
import { Router, RouterModule } from '@angular/router';
import { User } from '../../interfaces/user';
import { jwtDecode } from 'jwt-decode';


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
    RouterModule
    
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
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      email:new FormControl(null,[Validators.required]),
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
          next: (response) => {
            this.loginService.setSession(response,jwtDecode<User>(response.accesToken).role)
            this.router.navigate(['/home'])
          },

          error: (err) => {
            console.log(err)
            this.messageService.add({severity:'error',summary:'Error',detail:err,life:3000})
          },
        });
    } else {
      this.messageService.add({severity:'error',summary:'Error',detail:'Falta usuario o contraseña',life:3000})
    }
  }
}
