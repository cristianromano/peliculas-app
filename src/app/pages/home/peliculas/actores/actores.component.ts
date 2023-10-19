import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { environment } from 'src/environments/environment';

interface DataActor {
  nombre: string;
  apellido: string;
  pais: string;
}
const dataSource2: DataActor[] = [];

@Component({
  selector: 'app-actores',
  templateUrl: './actores.component.html',
  styleUrls: ['./actores.component.scss'],
})
export class ActoresComponent implements OnInit, OnChanges {
  @Output() seleccionarFila = new EventEmitter<any>();
  dataSource: DataActor[] = [];
  displayedColumns: string[] = ['nombre', 'apellido', 'pais'];
  app = initializeApp(environment.firebase);
  db = getFirestore(this.app);
  @Input() actor?: any;
  clickedRows = new Set<DataActor>();

  constructor() {}

  async ngOnInit() {
    try {
      const querySnapshot = await getDocs(collection(this.db, 'actores'));
      querySnapshot.forEach((doc: any) => {
        const data = [
          {
            nombre: doc.data().nombre,
            apellido: doc.data().apellido,
            pais: doc.data().pais,
            edad: doc.data().edad,
          },
        ];

        data.forEach((element) => {
          dataSource2.push({
            nombre: element.nombre,
            apellido: element.apellido,
            pais: element.pais,
          });
        });
      });
      this.dataSource = dataSource2;
    } catch (error) {
      console.error('Error al obtener documentos:', error);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.actor) {
      console.log(this.actor);
    }
  }

  seleccionFila($event: any) {
    $event.forEach((element: any) => {
      if (this.clickedRows.has(element) && this.clickedRows.size > 1) {
        this.clickedRows.delete(element);
      }
    });

    this.clickedRows.forEach((e) => {
      this.seleccionarFila.emit(e);
    });
  }
}
