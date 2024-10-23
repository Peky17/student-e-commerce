import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeatrosRoutingModule } from './teatros-routing.module';
import { TeatrosComponent } from './teatros.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectAsientoTeatroComponent } from './pages/components/select-asiento-teatro/select-asiento-teatro.component';
import { InvoiceTeatroComponent } from './pages/components/invoice-teatro/invoice-teatro.component';
import { PayementTeatroCardComponent } from './pages/components/payement-teatro-card/payement-teatro-card.component';
import { ReservarTeatroComponent } from './pages/reservar-teatro/reservar-teatro.component';
import { ViewTeatrosComponent } from './pages/view-teatros/view-teatros.component';


@NgModule({
  declarations: [
    TeatrosComponent,
    SelectAsientoTeatroComponent,
    InvoiceTeatroComponent,
    PayementTeatroCardComponent,
    ReservarTeatroComponent,
    ViewTeatrosComponent
  ],
  imports: [
    CommonModule,
    TeatrosRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class TeatrosModule { }
