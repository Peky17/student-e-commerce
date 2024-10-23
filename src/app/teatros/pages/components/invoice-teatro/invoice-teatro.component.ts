import { Component } from '@angular/core';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ReservarTeatroComponent } from '../../reservar-teatro/reservar-teatro.component';
import { TeatroService } from 'src/app/services/teatro.service';

@Component({
  selector: 'app-invoice-teatro',
  templateUrl: './invoice-teatro.component.html',
  styleUrls: ['./invoice-teatro.component.css'],
})
export class InvoiceTeatroComponent {
  cineId: string = '';
  cineName: string = '';
  fechaActual: Date;
  id_usuario: string = '';
  username: string = '';
  emision: string = new Date().toLocaleString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  datosCompartidos: any;

  precio: number = 0;
  qtySeats: number = 0;
  name: string = '';
  formatedSeats: any[] = [];

  constructor(
    private reservarTeatroComponent: ReservarTeatroComponent,
    private dataSharingService: DataSharingService,
    private teatroService: TeatroService,
    private route: ActivatedRoute
  ) {
    this.fechaActual = new Date();
  }

  ngOnInit() {
    // Obtener datos del cine
    this.cineId = this.route.snapshot.paramMap.get('id')!;
    this.teatroService.getTeatroById(this.cineId).subscribe({
      next: (response) => {
        if (
          response.teatro == null ||
          response.teatro == undefined ||
          response.teatro.length === 0
        ) {
          Swal.fire({
            icon: 'info',
            title: 'Oops...',
            text: 'No se encontró el teatro seleccionado.',
          });
        } else {
          this.cineName = response.teatro.nombre;
        }
      },
      error: (error) => {
        Swal.fire({
          icon: 'info',
          title: 'Oops...',
          text: 'No se encontró el teatro seleccionado.',
        });
        console.log(error);
      },
    });

    const user = localStorage.getItem('user');
    this.id_usuario = JSON.parse(user!).id;
    this.username = JSON.parse(user!).username;

    this.dataSharingService.dataObservable.subscribe((data) => {
      this.datosCompartidos = JSON.parse(data);
      this.precio = this.datosCompartidos.price;
      this.qtySeats = this.datosCompartidos.seats.length;
      this.name = this.datosCompartidos.selection;

      // Cambia el primer elemento de cada par [X, Y] por la letra correspondiente
      this.formatedSeats = this.cambiarPrimerElemento(
        this.datosCompartidos.seats
      );
    });
  }

  previous() {
    this.reservarTeatroComponent.previous();
  }

  next() {
    this.reservarTeatroComponent.next();
  }

  print() {
    // Crea un clon del div que contiene el contenido a imprimir
    const printContents = document
      .querySelector('.toPrint')!
      .cloneNode(true) as HTMLElement;

    // Encuentra la imagen que deseas excluir de la impresión
    const excludedImage = printContents.querySelector('.qrCode') as HTMLElement;
    if (excludedImage) {
      excludedImage.style.display = 'none'; // Oculta la imagen
    }

    // Crea un elemento HTML temporal para imprimir
    const printContainer = document.createElement('div');
    printContainer.appendChild(printContents);

    // Oculta todo el contenido de la página excepto el contenido a imprimir
    const elementsToHide = document.querySelectorAll('body > :not(.toPrint)');
    elementsToHide.forEach((element) => {
      if (element instanceof HTMLElement) {
        element.style.display = 'none';
      }
    });

    // Agrega el contenido a imprimir al cuerpo del documento
    document.body.appendChild(printContainer);

    // Imprime el contenido
    window.print();

    // Restaura la visibilidad de los elementos ocultos
    elementsToHide.forEach((element) => {
      if (element instanceof HTMLElement) {
        element.style.display = '';
      }
    });

    // Restaura la visibilidad de la imagen excluida
    if (excludedImage) {
      excludedImage.style.display = '';
    }

    // Elimina el contenido impreso del cuerpo del documento
    document.body.removeChild(printContainer);
  }

  formatFecha(fecha: Date): string {
    return (
      fecha.getDate() + '/' + (fecha.getMonth() + 1) + '/' + fecha.getFullYear()
    );
  }

  cambiarPrimerElemento(seats: any[]): any[] {
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // Alfabeto

    try {
      return seats.map((seat) => {
        if (
          typeof seat === 'object' &&
          seat !== null &&
          'row' in seat &&
          'seat' in seat
        ) {
          const x = seat.row;
          const y = seat.seat;

          const letra = letras.charAt(x + y);

          return [letra, y];
        } else {
          throw new Error('El objeto seat no tiene la estructura esperada');
        }
      });
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
