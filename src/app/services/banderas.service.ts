import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class BanderasService {
  constructor(private http: HttpClient) {}

  getBanderas() {
    return this.http.get('https://restcountries.com/v3.1/all');
  }

  getBanderaNombre(name: string) {
    return this.http.get(`https://restcountries.com/v3.1/name/${name}`);
  }
}
