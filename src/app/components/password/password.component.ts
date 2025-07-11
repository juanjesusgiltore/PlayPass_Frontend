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
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { Router, RouterModule } from '@angular/router';
import { Password } from '../../interfaces/password';
import { jwtDecode } from 'jwt-decode';
import { TokenResponse } from '../../interfaces/token-response';
import { Login } from '../../interfaces/login';


@Component({
  selector: 'app-password',
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
  templateUrl: './password.component.html',
  styleUrl: './password.component.css'
})
export class PasswordComponent implements OnInit {

  formGroup!: FormGroup;

  loading: boolean = false;

  

  constructor(
    private readonly loginService: LoginService,
    private readonly fb: FormBuilder,
    private readonly messageService: MessageService,
    private readonly router:Router,
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      email:new FormControl(null,[Validators.required]),
      password:new FormControl(null,[Validators.required]),
      passwordConfirm:new FormControl(null,[Validators.required]),

    });
    
  }

  login() {
    if (this.formGroup.valid ) {
      this.loading = true;
      let usuario:Password=this.formGroup.value;
      let login:Login={
        email:usuario.email,
        password:usuario.password
      }
      if(usuario.password===usuario.passwordConfirm){
      this.loginService
        .password(login)
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        )
        .subscribe({
          next: (response) => {
            this.loginService.setSession(response,jwtDecode<TokenResponse>(response.accesToken).role)
            this.router.navigate(['/home']);
          },

          error: (err) => {
            this.messageService.add({severity:'error',summary:'Error',detail:err.value,life:3000})
          },
        });
      }else{
                this.loading = false;
        this.messageService.add({severity:'error',summary:'Error',detail:'La contraseña no es la misma',life:3000})
      }
    } else {
      this.loading = false;
      this.messageService.add({severity:'error',summary:'Error',detail:'Falta usuario o contraseña',life:3000})
    }
  }
}
