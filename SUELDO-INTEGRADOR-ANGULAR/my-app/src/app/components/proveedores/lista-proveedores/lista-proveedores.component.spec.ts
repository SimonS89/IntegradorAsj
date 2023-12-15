import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaProveedoresComponent } from './lista-proveedores.component';

describe('ListaProveedoresComponent', () => {
  let component: ListaProveedoresComponent;
  let fixture: ComponentFixture<ListaProveedoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaProveedoresComponent]
    });
    fixture = TestBed.createComponent(ListaProveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
