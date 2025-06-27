import { Lugar } from './lugar.model';

export interface Asiento {
  id: number;
  lugar: Lugar;
  fila: string;
  numero: number;
  tipo: string;        // VIP, Normal
  disponible: boolean;
}
