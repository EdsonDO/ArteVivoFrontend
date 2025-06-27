import { Lugar } from './lugar.model';
import { Usuario } from './usuario.model';

export interface Evento {
  id: number;
  nombre: string;
  descripcion: string;
  fecha_inicio: string; // ISO string
  fecha_fin: string;
  lugar: Lugar;
  creado_por: Usuario | null;
  imagen?: string;      // URL
}
