import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../layout/footer/footer.component';
import { MenubarComponent } from '../layout/menubar/menubar.component';
import { TableModule } from 'primeng/table';
import { User } from '../../interfaces/user';
import { ButtonModule } from 'primeng/button';
import { UserService } from '../../services/user/user.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { DialogComponent } from '../dialog/dialog.component';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-admin',
  imports: [
    FooterComponent,
    MenubarComponent,
    TableModule,
    ButtonModule,
    DialogComponent,
    ConfirmDialogModule
  ],
  providers: [ConfirmationService],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
  users!: User[];

  user!: User;

  first = 0;

  rows = 10;
  visible: boolean = false;

  constructor(private readonly userService: UserService,private readonly confirmationService: ConfirmationService) {}

  ngOnInit(): void {
    this.userService.getListUsers().subscribe({
      next: (response) => {
        this.users = response;
      },

      error: (err) => {
        console.log(err);
      },
    });
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  pageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }

  isLastPage(): boolean {
    return this.users ? this.first + this.rows >= this.users.length : true;
  }

  isFirstPage(): boolean {
    return this.users ? this.first === 0 : true;
  }

  editar(user: User) {
    this.visible = true;
    this.user = user;
  }

  eliminar(id: number) {
    this.userService.deleteUser(id).subscribe({
      next: (response) => {
        let index = this.users.findIndex((u) =>u.id == id)
          if (index !== -1) {
            this.users.splice(index,1);
          }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  actualizarUser(updateUser: User) {
    this.userService.setUpdateUser(updateUser).subscribe({
      next: (response) => {
        let index = this.users.findIndex((u) =>u.id == updateUser.id);
        if (index !== -1) {
          this.users[index] = updateUser;
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

   open(event: Event,id:number) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: '¿Quieres eliminar a este usuario?',
            header: 'Cuidado',
            icon: 'pi pi-info-circle',
            rejectLabel: 'Cancel',
            rejectButtonProps: {
                label: 'Cancelar',
                severity: 'secondary',
                outlined: true,
            },
            acceptButtonProps: {
                label: 'Eliminar',
                severity: 'danger',
            },

            accept: () => {
              this.eliminar(id);
            },
            reject: () => {
            },
        });
    }
}

