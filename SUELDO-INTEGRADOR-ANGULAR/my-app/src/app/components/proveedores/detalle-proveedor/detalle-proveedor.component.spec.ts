import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleProveedorComponent } from './detalle-proveedor.component';

describe('DetalleProveedorComponent', () => {
  let component: DetalleProveedorComponent;
  let fixture: ComponentFixture<DetalleProveedorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleProveedorComponent]
    });
    fixture = TestBed.createComponent(DetalleProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
