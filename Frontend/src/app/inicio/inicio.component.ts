
import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
// Usamos la ruta relativa correcta, que ya confirmamos que funciona.
import { EventoService } from '@services/evento.service';
import { CategoriaService } from '@services/categoria.service';
import { Evento } from '@models/evento.model';
import { Categoria } from '@models/categoria.model';

@Component({
  selector: 'app-inicio',
  standalone: false,
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit, OnDestroy, AfterViewInit {

  // Propiedades para los datos del backend
  eventosDestacados: Evento[] = [];
  categorias: Categoria[] = [];
  eventosPromocionados: Evento[] = [];

  // Propiedades para los carruseles de eventos
  indiceDestacados = 0;
  indiceCercanos = 0;
  private autoplayInterval: any;

  // Lógica para el slider de categorías
  @ViewChild('categorySlider') categorySlider!: ElementRef<HTMLDivElement>;
  isCatScrollAtStart = true;
  isCatScrollAtEnd = false;

  private resizeObserver!: ResizeObserver;

  constructor(
    private eventoService: EventoService,
    private categoriaService: CategoriaService
  ) { }

  ngOnInit(): void {
    this.cargarDatosDeInicio();
    this.iniciarAutoplay();
  }

  ngAfterViewInit(): void {
    if (this.categorySlider) {
      this.resizeObserver = new ResizeObserver(() => {
 
        this.checkCategoryScroll();
      });
      this.resizeObserver.observe(this.categorySlider.nativeElement);


      this.categorySlider.nativeElement.addEventListener('scroll', this.checkCategoryScroll.bind(this));
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.autoplayInterval);
    if (this.categorySlider) {
      this.categorySlider.nativeElement.removeEventListener('scroll', this.checkCategoryScroll.bind(this));
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  cargarDatosDeInicio(): void {
    this.eventoService.getEventosDestacados().subscribe(data => {
      this.eventosDestacados = data.slice(0, 6);
    });

    this.categoriaService.getCategorias().subscribe(data => {
      this.categorias = data;
      setTimeout(() => this.checkCategoryScroll(), 100);
    });

    this.eventoService.getEventosPromocionados().subscribe(data => {
      const aleatorios = this.shuffleArray(data);
      this.eventosPromocionados = aleatorios.slice(0, 5);
    });
  }

  moverCategorias(direccion: 'prev' | 'next'): void {
    const slider = this.categorySlider.nativeElement;
    const scrollAmount = slider.clientWidth * 0.8;
    
    if (direccion === 'prev') {
      slider.scrollLeft -= scrollAmount;
    } else {
      slider.scrollLeft += scrollAmount;
    }

    setTimeout(() => {
      this.checkCategoryScroll();
    }, 300);
  }

  checkCategoryScroll(): void {

    if (!this.categorySlider || !this.categorySlider.nativeElement) {
      return;
    }
    const slider = this.categorySlider.nativeElement;
    this.isCatScrollAtStart = slider.scrollLeft < 1;
    this.isCatScrollAtEnd = slider.scrollWidth - slider.scrollLeft - slider.clientWidth < 1;
  }

  // --- Lógica existente para los otros carruseles ---
  moverDestacados(direccion: number): void {
    const nuevoIndice = this.indiceDestacados + direccion;
    if (nuevoIndice >= 0 && nuevoIndice <= this.eventosDestacados.length - 2) {
      this.indiceDestacados = nuevoIndice;
    }
    this.reiniciarAutoplay();
  }
  
  iniciarAutoplay(): void {
    this.autoplayInterval = setInterval(() => {
      let proximoIndice = this.indiceDestacados + 1;
      if (proximoIndice > this.eventosDestacados.length - 2) {
        proximoIndice = 0;
      }
      this.indiceDestacados = proximoIndice;
    }, 25000);
  }

  reiniciarAutoplay(): void {
    clearInterval(this.autoplayInterval);
    this.iniciarAutoplay();
  }

  private shuffleArray(array: any[]): any[] {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  }
}