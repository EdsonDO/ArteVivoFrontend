import { Lugar } from './lugar.model';
import { Categoria } from './categoria.model';

export interface Evento {
  id: number;
  nombre: string;
  descripcion: string;
  fecha_inicio: string; // Se mantiene como string para facilidad
  fecha_fin: string;
  imagen: string; // La URL completa de la imagen
  lugar: Lugar; // Objeto anidado con los detalles del lugar
  categoria: Categoria; // Objeto anidado con los detalles de la categoría
  es_destacado: boolean;
  es_promocionado: boolean;
  tipo_entrada: 'numerado' | 'general'; // ¡NUEVO!
}
