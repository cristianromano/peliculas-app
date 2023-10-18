import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent {
  email: string = '';
  password: string = '';
  app = initializeApp(environment.firebase);
  auth = getAuth(this.app);
  constructor(private route: Router, private toastr: ToastrService) {}

  registrarse() {
    debugger;
    createUserWithEmailAndPassword(this.auth, this.email, this.password)
      .then((usuario) => {
        console.log(usuario.user);
        this.toastr.success('Registro Correcto');
        this.route.navigate(['/home']);
      })
      .catch((error) => {
        this.toastr.error(error.code);
      });
  }

  irLogin() {
    this.route.navigate(['/login']);
  }
}
