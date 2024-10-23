import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservarCineComponent } from '../../reservar-cine/reservar-cine.component';
import Swal from 'sweetalert2';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { ReservacionesService } from 'src/app/services/reservaciones.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cine-payement-card',
  templateUrl: './payement-card.component.html',
  styleUrls: ['./payement-card.component.css'],
})
export class PayementCardComponent {
  myForm!: FormGroup;

  precio: number = 0;
  qtySeats: number = 0;
  name: string = '';
  formatedSeats: any[] = [];
  datosCompartidos: any;
  total: number = 0;

  constructor(
    private reservarCine: ReservarCineComponent,
    private dataSharingService: DataSharingService,
    private reservacionService: ReservacionesService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const cardNumberPattern = /^(?:\d{4}-?){4}$/;
    // const cvvPattern = /^\d{3}$/;
    this.myForm = this.formBuilder.group({
      username: ['', Validators.required],
      cardNumber: ['', Validators.pattern(cardNumberPattern)],
      expirationMonth: ['', Validators.required],
      expirationYear: ['', Validators.required],
      cvv: ['', Validators.required],
    });

    this.dataSharingService.dataObservable.subscribe((data) => {
      console.log(data);
      this.datosCompartidos = JSON.parse(data);
      this.precio = this.datosCompartidos.price;
      this.qtySeats = this.datosCompartidos.seats.length;
      this.name = this.datosCompartidos.selection;

      // Cambia el primer elemento de cada par [X, Y] por la letra correspondiente
      this.formatedSeats = this.cambiarPrimerElemento(
        this.datosCompartidos.seats
      );

      this.total = this.qtySeats * this.precio;
    });
  }

  createReservacion() {
    console.log('pressed');
    if (this.myForm.valid) {
      console.log(this.myForm.value);
      const reservacion = {
        concepto: this.name,
        cantidad: this.qtySeats,
        unitario: this.precio,
        total: this.total,
      };
      this.sendReservaion(reservacion);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor, completa los campos correctamente',
      });
    }
  }

  sendReservaion(reservacion: any) {
    this.reservacionService.createReservacion(reservacion).subscribe({
      next: (response) => {
        console.log(response);
        Swal.fire({
          icon: 'success',
          title: '¡Reservación exitosa!',
          text: 'Tu reservación ha sido guardada correctamente',
        }).then(() => {
          this.router.navigate(['/cines/home']);
        });
      },
      error: (error) => {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Hubo un error al guardar la reservación',
        });
      },
    });
  }

  formatCardNumber(event: any) {
    const input = event.target as HTMLInputElement;
    const trimmedValue = input.value.replace(/\D/g, ''); // Eliminar caracteres que no sean dígitos
    const formattedValue = trimmedValue.replace(/(\d{4})/g, '$1-'); // Agregar guiones después de cada grupo de 4 dígitos
    input.value = formattedValue.slice(0, 19); // Limitar la longitud total del valor y eliminar espacios en blanco al final
  }

  previous() {
    this.reservarCine.previous();
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
