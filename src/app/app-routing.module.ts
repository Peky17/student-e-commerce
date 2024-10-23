import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'task',
    loadChildren: () => import('./task/task.module').then((m) => m.TaskModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },
  {
    path: 'carrito',
    loadChildren: () =>
      import('./carrito/carrito.module').then((m) => m.CarritoModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfileModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
