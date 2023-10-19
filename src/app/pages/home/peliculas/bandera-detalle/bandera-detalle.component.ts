import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BanderasService } from 'src/app/services/banderas.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface Bandera {
  name: string;
  bandera: string;
  openStreetMaps: string;
  continente: string;
}

@Component({
  selector: 'app-bandera-detalle',
  templateUrl: './bandera-detalle.component.html',
  styleUrls: ['./bandera-detalle.component.scss'],
})
export class BanderaDetalleComponent implements OnChanges {
  selectedValue?: any;
  banderasArr: Bandera[] = [];
  embedUrl?: SafeResourceUrl;

  @Input()
  datoBandera?: any;

  constructor(private banderas: BanderasService) {}
  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    this.banderasArr = [];
    if (changes['datoBandera']) {
      this.banderas
        .getBanderaNombre(changes['datoBandera'].currentValue)
        .subscribe((data: any) => {
          data.forEach((element: any) => {
            console.log(element);
            this.banderasArr.push({
              name: element.name.common,
              bandera: element.flags.svg,
              openStreetMaps: element.maps.openStreetMaps,
              continente: element.continents[0],
            });
          });
        });
    }
  }
}
