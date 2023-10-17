import { Component, OnInit } from '@angular/core';
import { BanderasService } from 'src/app/services/banderas.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-alta-actor',
  templateUrl: './alta-actor.component.html',
  styleUrls: ['./alta-actor.component.scss'],
})
export class AltaActorComponent implements OnInit {
  bandera: any;
  formGroup: FormGroup = this.formBuilder.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    edad: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    bandera: [''],
  });

  constructor(private formBuilder: FormBuilder) {}
  ngOnInit(): void {}

  capturarSeleccion(bandera: string) {
    console.log('La bandera seleccionada es: ', bandera);
    this.formGroup?.patchValue({ bandera: bandera });
    this.bandera = bandera;
  }

  onSubmit() {
    if (this.formGroup?.valid && this.bandera) {
      // Aquí puedes enviar los datos a través de un servicio o realizar otras acciones necesarias
      console.log('Formulario enviado:', this.formGroup.value);
    } else {
      console.log(
        'El formulario es inválido. Por favor, complete todos los campos requeridos.'
      );
    }
  }
}
