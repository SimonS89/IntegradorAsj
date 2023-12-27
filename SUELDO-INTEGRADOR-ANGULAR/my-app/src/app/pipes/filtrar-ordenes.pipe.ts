import { Pipe, PipeTransform } from '@angular/core';
import { OrdenCompra } from '../models/OrdenCompra';

@Pipe({
  name: 'filtrarOrdenes'
})
export class FiltrarOrdenesPipe implements PipeTransform {

  transform(orders: OrdenCompra[], mostrarOrdenesActivas: boolean): OrdenCompra[] {
    if (mostrarOrdenesActivas) {
      return orders.filter((order) => order.isActive);
    }
    return orders;
  }

}
