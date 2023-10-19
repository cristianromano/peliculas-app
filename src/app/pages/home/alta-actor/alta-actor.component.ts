import { Component, OnInit } from '@angular/core';
import { BanderasService } from 'src/app/services/banderas.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SubirStorageService } from 'src/app/services/subir-storage.service';

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
  file?: any;
  imagen: any;
  formGroup: FormGroup = this.formBuilder.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    edad: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    bandera: [''],
  });

  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private toastr: ToastrService,
    private storage: SubirStorageService
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
        this.toastr.show('Cargado con exito', 'Actor en la base de datos');
      });
    } else {
      console.log(
        'El formulario es inválido. Por favor, complete todos los campos requeridos.'
      );
    }
  }

  async registroActor() {
    this.uploadFile(this.file).then((e) => {
      const docData = {
        nombre: this.formGroup.get('nombre')?.value,
        apellido: this.formGroup.get('apellido')?.value,
        edad: this.formGroup.get('edad')?.value,
        pais: this.bandera,
        foto: this.imagen,
      };
      addDoc(collection(this.db, 'actores'), docData).then((e) => {
        this.formGroup.reset();
        this.file = null;
      });
    });
  }

  async uploadFile(file: File) {
    if (this.file) {
      this.imagen = await this.storage.subirArchivo(this.file, 'actores');
    }
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }
}
