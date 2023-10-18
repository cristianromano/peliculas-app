import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { ToastrService } from 'ngx-toastr';
import { SubirStorageService } from 'src/app/services/subir-storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pelicula-alta',
  templateUrl: './pelicula-alta.component.html',
  styleUrls: ['./pelicula-alta.component.scss'],
})
export class PeliculaAltaComponent implements OnInit {
  app = initializeApp(environment.firebase);
  db = getFirestore(this.app);
  actorArr: any;
  file: any;
  imagen: any;

  formGroup: FormGroup = this.formBuilder.group({
    nombre: ['', Validators.required],
    descripcion: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private toastr: ToastrService,
    public storage: SubirStorageService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.uploadFile(this.file);
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

  async uploadFile(file: File) {
    if (this.file) {
      this.imagen = await this.storage.subirArchivo(this.file, 'fotos');
      const docData = {
        nombre: this.formGroup.get('nombre')?.value,
        descripcion: this.formGroup.get('descripcion')?.value,
        foto: this.imagen,
        actor: this.actorArr,
      };
      await addDoc(collection(this.db, 'peliculas'), docData).then((e) => {
        this.formGroup.reset();
      });
    }
  }

  actor($event: any) {
    debugger;
    this.actorArr = $event;
  }
}
