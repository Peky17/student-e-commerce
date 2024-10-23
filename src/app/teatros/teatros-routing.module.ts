import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeatrosComponent } from './teatros.component';
import { ViewTeatrosComponent } from './pages/view-teatros/view-teatros.component';
import { AuthGuard } from '../guards/auth.guard';
import { ReservarTeatroComponent } from './pages/reservar-teatro/reservar-teatro.component';

const routes: Routes = [
  {
    path: '',
    component: TeatrosComponent,
    children: [
      {
        path: 'home',
        component: ViewTeatrosComponent,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
      },
      {
        path: 'reservar/:id',
        component: ReservarTeatroComponent,
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
export class TeatrosRoutingModule {}
