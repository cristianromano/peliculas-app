import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeliculasComponent } from './peliculas.component';
import { PeliculaAltaComponent } from './pelicula-alta/pelicula-alta.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  { path: '', component: PeliculasComponent, canActivate: [AuthGuard] },
  {
    path: 'peliculas/alta',
    component: PeliculaAltaComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PeliculasRoutingModule {}
