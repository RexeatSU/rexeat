import type { Menú } from './menu';
import type { Categoria } from './categoria';
import type { Producto } from './producto';

export interface Carta {
  nombre: string;
  activa: boolean;
  menus: Menú[];
  categorias: Categoria[];
  productos: Producto[];
}
