import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CinesComponent } from './cines.component';
import { ViewCinesComponent } from './pages/view-cines/view-cines.component';
import { AuthGuard } from '../guards/auth.guard';
import { ReservarCineComponent } from './pages/reservar-cine/reservar-cine.component';

const routes: Routes = [
  {
    path: '',
    component: CinesComponent,
    children: [
      {
        path: 'home',
        component: ViewCinesComponent,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
      },
      {
        path: 'reservar/:id',
        component: ReservarCineComponent,
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
export class CinesRoutingModule {}
