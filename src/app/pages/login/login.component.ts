import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  app = initializeApp(environment.firebase);
  db = getFirestore(this.app);
  auth = getAuth(this.app);
  email: string = '';
  password: string = '';
  constructor(private route: Router, private toastr: ToastrService) {}

  async login() {
    signInWithEmailAndPassword(this.auth, this.email, this.password)
      .then((credenciales) => {
        const ref = collection(this.db, 'users');
        const data = {
          fecha: new Date(),
          nombre: this.email,
        };
        addDoc(ref, data);
        this.toastr.success('Login Correcto');
        this.route.navigate(['/home']);
        console.log(credenciales);
      })
      .catch(() => {
        this.toastr.error('No se pudo loguear');
      })
      .catch((error) => {
        this.toastr.error(error.code);
      });
  }

  registro() {
    this.route.navigate(['/registro']);
  }

  logOut() {
    this.auth.signOut();
  }
}
