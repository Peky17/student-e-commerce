import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservacionesRoutingModule } from './reservaciones-routing.module';
import { ReservacionesComponent } from './reservaciones.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewReservacionesComponent } from './pages/view-reservaciones/view-reservaciones.component';

@NgModule({
  declarations: [ReservacionesComponent, ViewReservacionesComponent],
  imports: [
    CommonModule,
    ReservacionesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class ReservacionesModule {}
