import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private route: Router) {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  IrPeliculas() {
    this.route.navigate(['/peliculas']);
  }

  irActores() {
    this.route.navigate(['/home/alta-actor']);
  }
}
