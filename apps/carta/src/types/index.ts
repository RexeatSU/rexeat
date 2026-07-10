export enum TipoProducto {
  Plato = 'plato',
  Bebida = 'bebida',
  Menu = 'menu'
}

export enum Moneda {
  EUR = 'EUR',
  USD = 'USD'
}

export enum Alergeno {
  Gluten = 'gluten',
  Lactosa = 'lactosa',
  Crustaceos = 'crustaceos',
  Huevos = 'huevos',
  Pescado = 'pescado',
  Cacahuetes = 'cacahuetes',
  Soja = 'soja',
  FrutosSecos = 'frutosSecos',
  Apio = 'apio',
  Mostaza = 'mostaza',
  Sesamo = 'sesamo',
  Sulfitos = 'sulfitos',
  Altramuces = 'altramuces',
  Moluscos = 'moluscos'
}

export interface Precio {
  valor: number;
  moneda: Moneda;
}

export interface Cantidad {
  defecto: number;
  minima: number;
  maxima: number;
  unidad: string;
  suplementoExtra?: Precio;
}

export interface Ingrediente {
  id: number;
  nombre: string;
  alergenos: Alergeno[];
  cantidad: Cantidad;
}

export interface Producto {
  id: number;
  tipo: TipoProducto;
  nombre: string;
  precio: Precio;
  disponible: boolean;
  categorias: string[];
  alergenos: Alergeno[];
  descripcion: string;
  imagen: string;
}

export interface Plato extends Producto {
  tipo: TipoProducto.Plato;
  ingredientes: Ingrediente[];
}

export interface Bebida extends Producto {
  tipo: TipoProducto.Bebida;
  marca: string;
  denominacionOrigen?: string;
  tieneAlcohol: boolean;
  graduacion?: string;
}

export interface OpcionMenu {
  producto: Producto;
  suplemento?: Precio;
}

export interface SeccionMenu {
  id: number;
  nombre: string;
  opciones: OpcionMenu[];
}

export interface Menu extends Producto {
  tipo: TipoProducto.Menu;
  secciones: SeccionMenu[];
}

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
}

export interface Dueno extends Usuario {
  restaurantes: Restaurante[];
}

export interface Manager extends Usuario {
  restauranteId: number;
}

export interface Restaurante {
  id: number;
  nombre: string;
  direccion?: string;
  telefono?: string;
  managers: Manager[];
  cartas: Carta[];
}

export interface Carta {
  id: number;
  nombre: string;
  activa: boolean;
  productos: Producto[];
  categorias: string[];
}

export interface Comensal {
  idiomaPreferido: string;
}
