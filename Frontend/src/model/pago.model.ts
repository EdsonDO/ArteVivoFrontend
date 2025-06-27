import { Entrada } from './entrada.model';

export interface Pago {
  id: number;
  entrada: Entrada;
  metodo: string;      // tarjeta, yape
  estado: string;      // completado
  fecha: string;
  monto: number;
}
