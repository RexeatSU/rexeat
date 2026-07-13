import type { Producto } from './producto';

export interface Medida {
  singular: string;
  plural: string;
}

export interface Cantidad {
  defecto: number;
  minima: number;
  maxima: number;
  unidadMedida: Medida;
}

export interface Ingrediente {
  nombre: string;
  suplementoExtra: number;
  cantidad: Cantidad;
}

export interface Plato extends Producto {
  descripcion: string;
  imagen: string;
  ingredientes: Ingrediente[];
}
