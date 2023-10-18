import { Component, EventEmitter, Output } from '@angular/core';
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
export class ActoresComponent {
  @Output() seleccionarFila = new EventEmitter<any>();
  dataSource: DataActor[] = [];
  displayedColumns: string[] = ['nombre', 'apellido', 'pais'];
  app = initializeApp(environment.firebase);
  db = getFirestore(this.app);

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

  seleccionFila($event: any) {
    this.clickedRows.forEach((e) => {
      this.seleccionarFila.emit(e);
    });
  }
}
