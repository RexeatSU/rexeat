import type { Producto } from './producto';

export interface Bebida extends Producto {
  descripcion: string;
  alcohol: boolean;
  marca: string;
  denominacionOrigen: string;
}
