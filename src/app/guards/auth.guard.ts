import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  app = initializeApp(environment.firebase);
  auth = getAuth(this.app);
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (!this.auth.currentUser) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
