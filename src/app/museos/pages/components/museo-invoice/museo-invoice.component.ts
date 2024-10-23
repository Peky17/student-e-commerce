import { Component } from '@angular/core';
import { ReservarMuseoComponent } from '../../reservar-museo/reservar-museo.component';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { ActivatedRoute } from '@angular/router';
import { MuseoService } from 'src/app/services/museo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-museo-invoice',
  templateUrl: './museo-invoice.component.html',
  styleUrls: ['./museo-invoice.component.css'],
})
export class MuseoInvoiceComponent {
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

  constructor(
    private reservarMuseoComponent: ReservarMuseoComponent,
    private dataSharingService: DataSharingService,
    private museoService: MuseoService,
    private route: ActivatedRoute
  ) {
    this.fechaActual = new Date();
  }

  ngOnInit() {
    // Obtener datos del cine
    this.cineId = this.route.snapshot.paramMap.get('id')!;
    this.museoService.getMuseoById(this.cineId).subscribe({
      next: (response) => {
        if (
          response.museo == null ||
          response.museo == undefined ||
          response.museo.length === 0
        ) {
          Swal.fire({
            icon: 'info',
            title: 'Oops...',
            text: 'No se encontró el cine seleccionado.',
          });
        } else {
          this.cineName = response.museo.nombre;
          this.precio = response.museo.precio;
        }
      },
      error: (error) => {
        Swal.fire({
          icon: 'info',
          title: 'Oops...',
          text: 'No se encontró el cine seleccionado.',
        });
        console.log(error);
      },
    });

    const user = localStorage.getItem('user');
    this.id_usuario = JSON.parse(user!).id;
    this.username = JSON.parse(user!).username;

    this.dataSharingService.dataObservable.subscribe((data: any) => {
      this.qtySeats = data.cantidadEntradas;
    });
    this.getSharedData();
  }

  previous() {
    this.reservarMuseoComponent.previous();
  }

  next() {
    const jsonData = {
      concepto: this.cineName,
      cantidad: this.qtySeats,
      unitario: this.precio,
      total: this.precio * this.qtySeats,
    };
    // Guardar la reserva en la base de datos
    this.datosCompartidos =
      this.dataSharingService.sendDataToSharedPayement(JSON.stringify(jsonData));
    // Siguiente step
    this.reservarMuseoComponent.next();
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

  getSharedData() {
    this.dataSharingService.dataObservable.subscribe((data) => {
      // console.log(data.toString);
    });
  }
}
