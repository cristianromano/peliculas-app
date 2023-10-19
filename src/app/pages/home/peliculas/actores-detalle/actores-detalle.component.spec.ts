import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActoresDetalleComponent } from './actores-detalle.component';

describe('ActoresDetalleComponent', () => {
  let component: ActoresDetalleComponent;
  let fixture: ComponentFixture<ActoresDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActoresDetalleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActoresDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
