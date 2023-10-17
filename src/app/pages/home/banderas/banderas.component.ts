import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BanderasService } from 'src/app/services/banderas.service';

interface Bandera {
  name: string;
}

@Component({
  selector: 'app-banderas',
  templateUrl: './banderas.component.html',
  styleUrls: ['./banderas.component.scss'],
})
export class BanderasComponent implements OnInit {
  selectedValue?: any;
  banderasArr: Bandera[] = [];
  @Output() banderaSeleccionada = new EventEmitter<string>();

  constructor(private banderas: BanderasService) {}
  ngOnInit(): void {
    this.banderas.getBanderas().subscribe((data: any) => {
      data.forEach((element: any) => {
        this.banderasArr.push({ name: element.name.common });
      });
    });
  }

  emitirSeleccion(bandera: string) {
    this.banderaSeleccionada.emit(bandera);
  }
}
