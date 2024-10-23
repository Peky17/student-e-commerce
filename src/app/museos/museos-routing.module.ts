import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MuseosComponent } from './museos.component';
import { ViewMuseosComponent } from './pages/view-museos/view-museos.component';
import { AuthGuard } from '../guards/auth.guard';
import { ReservarMuseoComponent } from './pages/reservar-museo/reservar-museo.component';

const routes: Routes = [
  {
    path: '',
    component: MuseosComponent,
    children: [
      {
        path: 'home',
        component: ViewMuseosComponent,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
      },
      {
        path: 'reservar/:id',
        component: ReservarMuseoComponent,
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
export class MuseosRoutingModule {}
