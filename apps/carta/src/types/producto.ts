import type { Alergeno } from './alergeno';

export interface Producto {
  nombre: string;
  precio: number;
  stock: boolean;
  disponible: boolean;
  alergenos: Alergeno[];
}
