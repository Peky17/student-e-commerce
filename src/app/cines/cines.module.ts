import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CinesRoutingModule } from './cines-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReservarCineComponent } from './pages/reservar-cine/reservar-cine.component';
import { CinesComponent } from './cines.component';
import { ViewCinesComponent } from './pages/view-cines/view-cines.component';
import { CardSliderComponent } from './pages/components/card-slider/card-slider.component';
import { SelectAsientosComponent } from './pages/components/select-asientos/select-asientos.component';
import { SeatsioAngularModule } from '@seatsio/seatsio-angular';
import { InvoiceComponent } from './pages/components/invoice/invoice.component';
import { PayementCardComponent } from './pages/components/payement-card/payement-card.component';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    CinesComponent,
    ReservarCineComponent,
    ViewCinesComponent,
    CardSliderComponent,
    SelectAsientosComponent,
    InvoiceComponent,
    PayementCardComponent,
  ],
  imports: [
    CommonModule,
    CinesRoutingModule,
    SharedModule,
    SeatsioAngularModule,
    ReactiveFormsModule,
  ],
})
export class CinesModule {}
