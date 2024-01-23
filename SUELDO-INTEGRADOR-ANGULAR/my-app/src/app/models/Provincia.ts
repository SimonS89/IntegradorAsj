import { Pais } from './Pais';

export interface Provincia {
  id: number;
  nombre: string;
  pais: Pais;
}
