import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MuseosRoutingModule } from './museos-routing.module';
import { MuseosComponent } from './museos.component';
import { ReservarMuseoComponent } from './pages/reservar-museo/reservar-museo.component';
import { ViewMuseosComponent } from './pages/view-museos/view-museos.component';
import { MuseoInvoiceComponent } from './pages/components/museo-invoice/museo-invoice.component';
import { PayementMuseoCardComponent } from './pages/components/payement-museo-card/payement-museo-card.component';
import { InfoMuseoComponent } from './pages/components/info-museo/info-museo.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MuseosComponent,
    ReservarMuseoComponent,
    ViewMuseosComponent,
    MuseoInvoiceComponent,
    PayementMuseoCardComponent,
    InfoMuseoComponent,
  ],
  imports: [
    CommonModule,
    MuseosRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class MuseosModule {}
