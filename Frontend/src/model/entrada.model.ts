import { Usuario } from './usuario.model';
import { Evento } from './evento.model';
import { Asiento } from './asiento.model';

export interface Entrada {
  id: number;
  usuario: Usuario;
  evento: Evento;
  asiento: Asiento | null;
  codigo_qr: string;  // ruta imagen QR
  fecha_compra: string;
  estado: string;     // pagado
}
