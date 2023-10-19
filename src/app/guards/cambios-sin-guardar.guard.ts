import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CambiosSinGuardarGuard implements CanDeactivate<unknown> {
  cambiosSinGuardar: boolean = true;

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.cambiosSinGuardar) {
      return confirm(
        '¿Estás seguro de que quieres abandonar la página sin guardar los cambios?'
      );
    }
    return true;
  }
}
