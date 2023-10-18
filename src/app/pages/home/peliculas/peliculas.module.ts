import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeliculasRoutingModule } from './peliculas-routing.module';
import { PeliculasComponent } from './peliculas.component';
import { PeliculaAltaComponent } from './pelicula-alta/pelicula-alta.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ActoresComponent } from './actores/actores.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [PeliculasComponent, PeliculaAltaComponent, ActoresComponent],
  imports: [
    CommonModule,
    PeliculasRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatTableModule,
  ],
})
export class PeliculasModule {}
