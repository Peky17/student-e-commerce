import { Component, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Stepper from 'bs-stepper';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservar-cine',
  templateUrl: './reservar-cine.component.html',
  styleUrls: [
    './reservar-cine.component.css',
    '../../../../assets/css/bs-stepper.css',
  ],
})
export class ReservarCineComponent {
  // Mensaje para cerrar pestaña
  @HostListener('window:beforeunload', ['$event'])
  handleBeforeUnload(event: any): void {
    const mensaje =
      '¿Estás seguro de abandonar la página? Los cambios no se guardarán.';
    event.returnValue = mensaje;
  }

  constructor(private route: ActivatedRoute) {}

  private stepper: Stepper | undefined;
  id_cine: string | null = this.route.snapshot.paramMap.get('id');

  ngOnInit() {
    // Stepper
    const stepperElement = document.querySelector('#stepper1');
    if (stepperElement) {
      this.stepper = new Stepper(stepperElement, {
        linear: true,
        animation: true,
      });
    } else {
      console.error('Elemento con ID "stepper1" no encontrado.');
    }
  }

  public next() {
    if (this.stepper) {
      // Validar asientos seleccionados
      if (this.validateSeatSelection()) {
        this.stepper.next();
      } else {
        Swal.fire({
          toast: true,
          position: 'top-end',
          title: 'Error',
          text: 'Porfavor seleccione al menos un asiento.',
          timer: 1800,
          timerProgressBar: true,
          icon: 'info',
          showConfirmButton: false,
        });
      }
    }
  }

  public previous() {
    if (this.stepper) {
      this.stepper.previous();
    }
  }

  validateSeatSelection() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')!);
    if (selectedSeats == undefined || selectedSeats.length === 0) {
      return false;
    } else {
      return true;
    }
  }
}
