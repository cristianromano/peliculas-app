import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeliculasComponent } from './peliculas.component';
import { PeliculaAltaComponent } from './pelicula-alta/pelicula-alta.component';

const routes: Routes = [
  { path: '', component: PeliculasComponent },
  { path: 'peliculas/alta', component: PeliculaAltaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PeliculasRoutingModule {}
