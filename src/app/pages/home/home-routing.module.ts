import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { AltaActorComponent } from './alta-actor/alta-actor.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'home/alta-actor',
    component: AltaActorComponent,
  },
  {
    path: 'peliculas',
    loadChildren: () =>
      import('./peliculas/peliculas.module').then((m) => m.PeliculasModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
