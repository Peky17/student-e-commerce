import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagosRoutingModule } from './pagos-routing.module';
import { PagosComponent } from './pagos.component';
import { SharedModule } from "../shared/shared.module";


@NgModule({
  declarations: [
    PagosComponent
  ],
  imports: [
    CommonModule,
    PagosRoutingModule,
    SharedModule
]
})
export class PagosModule { }
