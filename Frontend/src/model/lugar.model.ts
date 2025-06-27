export interface Lugar {
  id: number;          // Django da ID auto
  nombre: string;
  tipo: string;        // estadio, teatro, etc.
  direccion: string;
  tiene_asientos: boolean;
}
