import type { Producto } from './producto';

export interface Menú extends Producto {
  activo: boolean;
  productos: Producto[];
}
