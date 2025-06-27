import { Rol } from './rol.model';

export interface Usuario {
  idUsuario: number;      // primary_key
  username: string;
  email: string;
  rol: Rol | null;        // puede ser null
  fecha_registro: string; // DateField
}
