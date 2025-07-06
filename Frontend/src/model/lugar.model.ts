export interface Lugar {
  id: number;
  nombre: string;
  tipo: string;
  direccion: string;
  tiene_asientos: boolean; // Corregido de numAsientos
}
