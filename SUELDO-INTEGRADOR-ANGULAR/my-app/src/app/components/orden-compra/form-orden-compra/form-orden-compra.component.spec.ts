import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormOrdenCompraComponent } from './form-orden-compra.component';

describe('FormOrdenCompraComponent', () => {
  let component: FormOrdenCompraComponent;
  let fixture: ComponentFixture<FormOrdenCompraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormOrdenCompraComponent]
    });
    fixture = TestBed.createComponent(FormOrdenCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
