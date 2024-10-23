import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarritoRoutingModule } from './carrito-routing.module';
import { CarritoComponent } from './carrito.component';
import { SharedModule } from "../shared/shared.module";
import { CartitoUsuarioComponent } from './cartito-usuario/cartito-usuario.component';


@NgModule({
  declarations: [
    CarritoComponent,
    CartitoUsuarioComponent
  ],
  imports: [
    CommonModule,
    CarritoRoutingModule,
    SharedModule
]
})
export class CarritoModule { }
