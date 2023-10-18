import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  app = initializeApp(environment.firebase);
  auth = getAuth(this.app);

  userEmail: string | null = null;
  constructor(private route: Router) {}

  logOut() {
    this.auth.signOut();
    this.route.navigate(['/']);
  }
  IrHome() {
    this.route.navigate(['/']);
  }
  ngOnInit() {
    this.estaLogueado();
  }
  estaLogueado() {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.userEmail = user.email;
      } else {
        this.userEmail = null;
      }
    });
  }

  irSegunLog() {
    if (this.userEmail) {
      return '/home';
    } else {
      return '/';
    }
  }
}
