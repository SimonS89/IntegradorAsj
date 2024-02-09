import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from '../models/Usuario';

@Pipe({
  name: 'usernameFilter',
})
export class UsernameFilterPipe implements PipeTransform {
  transform(usuarios: Usuario[], searchTerm: string): Usuario[] {
    if (!usuarios || !searchTerm) {
      return usuarios;
    }

    return usuarios.filter((usuario) =>
      usuario.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}
