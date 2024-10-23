import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservacionesComponent } from './reservaciones.component';
import { AuthGuard } from '../guards/auth.guard';
import { ViewReservacionesComponent } from './pages/view-reservaciones/view-reservaciones.component';

const routes: Routes = [
  {
    path: '',
    component: ReservacionesComponent,
    children: [
      {
        path: 'home',
        component: ViewReservacionesComponent,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
      },
      // Si no coincide ninguna ruta
      {
        path: '**',
        redirectTo: 'home',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservacionesRoutingModule {}
