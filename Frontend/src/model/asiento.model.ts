export interface Asiento {
  id: number;
  lugar: number; // El ID del lugar
  seccion: string; // ¡NUEVO! Para agrupar (Platea, VIP, etc.)
  fila: string;
  numero: number;
  tipo: string;
  disponible: boolean;
  precio: number; // ¡NUEVO!
}