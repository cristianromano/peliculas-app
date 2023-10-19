import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { environment } from 'src/environments/environment';

interface Peliculas {
  actor: {
    apellido: string;
    nombre: string;
    pais: string;
  };
  descripcion: string;
  foto: string;
  titulo: string;
}

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.scss'],
})
export class PeliculasComponent implements OnInit {
  data: Peliculas[] = [];
  app = initializeApp(environment.firebase);
  db = getFirestore(this.app);
  actorArr: any;
  peliculasActor: Peliculas[] = [];
  bandera?: string;
  nombreCompleto?: string;
  constructor(private route: Router) {}

  ngOnInit(): void {
    this.data = [];
    this.getPeliculas();
  }

  getPeliculas() {
    getDocs(collection(this.db, 'peliculas')).then((e) => {
      e.forEach((element) => {
        this.data.push({
          actor: {
            nombre: element.data()['actor']['nombre'],
            apellido: element.data()['actor']['apellido'],
            pais: element.data()['actor']['pais'],
          },
          descripcion: element.data()['descripcion'],
          foto: element.data()['foto'],
          titulo: element.data()['nombre'],
        });
      });
    });
  }

  irAltaPelicula() {
    this.route.navigate(['/peliculas/alta']);
  }

  actorPeliculas($event: any) {
    this.actorArr = [];
    this.peliculasActor = [];
    this.bandera = undefined;
    this.actorArr = $event;

    this.data.forEach((e) => {
      if (
        e.actor.nombre == this.actorArr.nombre &&
        e.actor.apellido == this.actorArr.apellido
      ) {
        this.peliculasActor.push({
          actor: {
            nombre: e.actor.nombre,
            apellido: e.actor.apellido,
            pais: e.actor.pais,
          },
          descripcion: e.descripcion,
          foto: e.foto,
          titulo: e.titulo,
        });
        this.bandera = this.peliculasActor[0].actor.pais;
        this.nombreCompleto = `${this.peliculasActor[0].actor.nombre} ${this.peliculasActor[0].actor.apellido}`;
      }
    });

    if (this.bandera == undefined) {
      this.bandera = '';
    }
  }
}
