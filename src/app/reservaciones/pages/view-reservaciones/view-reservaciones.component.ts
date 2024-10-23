import { Component } from '@angular/core';
import { ReservacionesService } from 'src/app/services/reservaciones.service';

@Component({
  selector: 'app-view-reservaciones',
  templateUrl: './view-reservaciones.component.html',
  styleUrls: ['./view-reservaciones.component.css'],
})
export class ViewReservacionesComponent {
  reservaciones: any;
  constructor(private reservacionesService: ReservacionesService) {}

  ngOnInit() {
    // Obtenemos el usuario actual
    const user = JSON.parse(localStorage.getItem('user')!);
    this.reservacionesService.getReservacionesByUser(user.id).subscribe({
      next: (response) => {
        if (response.reservaciones.length === 0) {
          console.log('Aún no hay reservaciones');
        } else {
          this.reservaciones = response.reservaciones;
          console.log(response);
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
