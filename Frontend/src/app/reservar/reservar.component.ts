import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
// Imports de Servicios y Modelos
import { EventoService } from '@services/evento.service';
import { ReservaService } from '@services/reserva.service';
import { Evento } from '@models/evento.model';
import { Asiento } from '@models/asiento.model';

@Component({
  selector: 'app-reservar',
  standalone: false, 
  templateUrl: './reservar.component.html',
  styleUrls: ['./reservar.component.css'],
  animations: [
    trigger('cardAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(20px) scale(0.95)', opacity: 0 }),
        animate('400ms ease-out', style({ transform: 'translateY(0) scale(1)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateY(20px) scale(0.95)', opacity: 0 }))
      ])
    ])
  ]
})
export class ReservarComponent implements OnInit {
  // --- Listas de datos del backend ---
  eventos: Evento[] = [];
  asientosDisponibles: Asiento[] = [];

  // --- Estado de la UI ---
  eventoSeleccionado: Evento | null = null;
  asientoSeleccionado: Asiento | null = null;
  reservaConfirmada = false;
  estaCargando = false;
  datosEntradaFinal: any = null;

  // --- Modelo del formulario ---
  reserva = {
    eventoId: null,
    asientoId: null,
    metodoPago: 'tarjeta',
    pago: {
      nombreTitular: '',
      numeroTarjeta: '',
      fechaVencimiento: '',
      cvv: ''
    }
  };

  constructor(
    private eventoService: EventoService,
    private reservaService: ReservaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Al iniciar, cargamos la lista de todos los eventos para el dropdown
    this.eventoService.getTodosLosEventos().subscribe(data => {
      this.eventos = data.filter(evento => new Date(evento.fecha_inicio) > new Date());
    });
  }

  // --- Lógica de Interacción del Formulario ---

  onEventoChange(eventoId: number): void {
    this.asientoSeleccionado = null; // Resetea el asiento al cambiar de evento
    this.reserva.asientoId = null;
    this.eventoSeleccionado = this.eventos.find(e => e.id === eventoId) || null;

    if (this.eventoSeleccionado) {
      if (this.eventoSeleccionado.tipo_entrada === 'general') {
        this.asientosDisponibles = [];
      } else {
        this.reservaService.getAsientosPorLugar(this.eventoSeleccionado.lugar.id).subscribe(asientos => {
          this.asientosDisponibles = asientos;
        });
      }
    }
  }

  onAsientoChange(asientoId: number): void {
    // Guarda el objeto completo del asiento seleccionado para mostrar detalles
    this.asientoSeleccionado = this.asientosDisponibles.find(a => a.id === asientoId) || null;
  }

  confirmarReserva(): void {
    this.estaCargando = true;

    const datosParaBackend = {
      evento: this.reserva.eventoId,
      asiento: this.reserva.asientoId,
      // ... otros datos del pago
    };

    setTimeout(() => {
      this.datosEntradaFinal = {
        evento: this.eventoSeleccionado,
        asiento: this.asientoSeleccionado,
        codigo_qr: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=Entrada-Ev${this.eventoSeleccionado?.id}-As${this.asientoSeleccionado?.id}`
      };
      
      this.estaCargando = false;
      this.reservaConfirmada = true;
    }, 2000);
  }

  volverAlInicio(): void {
    this.router.navigate(['/inicio']);
  }
}