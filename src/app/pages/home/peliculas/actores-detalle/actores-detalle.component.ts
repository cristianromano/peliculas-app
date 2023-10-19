import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { environment } from 'src/environments/environment';

interface Actor {
  apellido: string;
  edad: string;
  foto: string;
  nombre: string;
  pais: string;
}

@Component({
  selector: 'app-actores-detalle',
  templateUrl: './actores-detalle.component.html',
  styleUrls: ['./actores-detalle.component.scss'],
})
export class ActoresDetalleComponent implements OnInit, OnChanges {
  actorArr: Actor[] = [];
  @Input() actor?: string;
  app = initializeApp(environment.firebase);
  db = getFirestore(this.app);

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    this.actorArr = [];
    if (this.actor) {
      const [nombre, apellido] = this.actor?.split(' ');
      const querySnapshot = await getDocs(collection(this.db, 'actores'));
      querySnapshot.forEach((doc: any) => {
        if (doc.data().nombre == nombre && doc.data().apellido == apellido) {
          this.actorArr.push({
            apellido: doc.data().apellido,
            edad: doc.data().edad,
            foto: doc.data().foto,
            nombre: doc.data().nombre,
            pais: doc.data().pais,
          });
        }
      });
    }
  }
  ngOnInit(): void {}
}
