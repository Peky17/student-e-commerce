import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { ReservacionesService } from 'src/app/services/reservaciones.service';
import Swal from 'sweetalert2';
import { ReservarMuseoComponent } from '../../reservar-museo/reservar-museo.component';

@Component({
  selector: 'app-payement-museo-card',
  templateUrl: './payement-museo-card.component.html',
  styleUrls: ['./payement-museo-card.component.css'],
})
export class PayementMuseoCardComponent {
  myForm!: FormGroup;

  precio: number = 0;
  name: string = '';
  qtyEntradas: number = 0;
  datosCompartidos: any;
  total: number = 0;

  constructor(
    private reservarMuseo: ReservarMuseoComponent,
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
      this.datosCompartidos = data;
      this.precio = this.datosCompartidos.price;
      this.name = this.datosCompartidos.selection;
      this.qtyEntradas = this.datosCompartidos.cantidadEntradas;
      this.total = this.qtyEntradas * this.precio;
    });
  }

  createReservacion() {
    if (this.myForm.valid) {
      // console.log(this.myForm.value);
      const data = this.datosCompartidos;
      this.sendReservaion(data);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor, completa los campos correctamente',
      });
    }
  }

  sendReservaion(reservacion: any) {
    const reservacionJson = JSON.parse(reservacion);
    this.reservacionService.createReservacion(reservacionJson).subscribe({
      next: (response) => {
        console.log(response);
        Swal.fire({
          icon: 'success',
          title: '¡Reservación exitosa!',
          text: 'Tu reservación ha sido guardada correctamente',
        }).then(() => {
          this.router.navigate(['/museos/home']);
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
    this.reservarMuseo.previous();
  }
}
