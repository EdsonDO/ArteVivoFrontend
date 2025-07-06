import { Entrada } from './entrada.model';

export interface Pago {
    id?: number;
    entrada: Entrada;
    metodo: string;
    estado: string;
    fecha: string;
    monto: number;
}
