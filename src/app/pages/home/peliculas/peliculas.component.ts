import { Component, OnInit } from '@angular/core';
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
  ngOnInit(): void {
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
      console.log(this.data);
    });
  }
}
