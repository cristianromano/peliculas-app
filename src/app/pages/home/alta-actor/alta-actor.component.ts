import { Component, OnInit } from '@angular/core';
import { BanderasService } from 'src/app/services/banderas.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-alta-actor',
  templateUrl: './alta-actor.component.html',
  styleUrls: ['./alta-actor.component.scss'],
})
export class AltaActorComponent implements OnInit {
  app = initializeApp(environment.firebase);
  db = getFirestore(this.app);
  auth = getAuth(this.app);
  bandera: any;
  formGroup: FormGroup = this.formBuilder.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    edad: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    bandera: [''],
  });

  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  capturarSeleccion(bandera: string) {
    console.log('La bandera seleccionada es: ', bandera);
    this.formGroup?.patchValue({ bandera: bandera });
    this.bandera = bandera;
  }

  onSubmit() {
    if (this.formGroup?.valid && this.bandera) {
      // Aquí puedes enviar los datos a través de un servicio o realizar otras acciones necesarias
      this.registroActor().then((e) => {
        console.log('exito');
      });
    } else {
      console.log(
        'El formulario es inválido. Por favor, complete todos los campos requeridos.'
      );
    }
  }

  async registroActor() {
    const docData = {
      nombre: this.formGroup.get('nombre')?.value,
      apellido: this.formGroup.get('apellido')?.value,
      edad: this.formGroup.get('edad')?.value,
      pais: this.bandera,
    };
    await addDoc(collection(this.db, 'actores'), docData);
  }
}
