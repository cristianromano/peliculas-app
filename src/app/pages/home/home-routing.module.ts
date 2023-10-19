import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { AltaActorComponent } from './alta-actor/alta-actor.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'home/alta-actor',
    component: AltaActorComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'peliculas',
    loadChildren: () =>
      import('./peliculas/peliculas.module').then((m) => m.PeliculasModule),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
