import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SubirStorageService {
  app = initializeApp(environment.firebase);
  storage = getStorage(this.app);

  async subirArchivo(file: File, carpeta: string): Promise<string> {
    const imagenRef = ref(this.storage, `${carpeta}/${file.name}`);
    await uploadBytes(imagenRef, file);

    const imageUrl = getDownloadURL(imagenRef);

    return imageUrl;
  }

  constructor() {}
}
