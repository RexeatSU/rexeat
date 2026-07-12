import type { Producto } from './producto';

export interface Plato extends Producto {
  descripcion: string;
  imagen: string;
}
