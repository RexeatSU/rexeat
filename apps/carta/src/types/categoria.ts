import type { Producto } from './producto';

export interface Categoria {
  nombre: string;
  productos: Producto[];
}
