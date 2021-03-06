import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'asistencia',
    pathMatch: 'full',
    loadChildren: () => import('./asistencia/asistencia.module').then(m => m.AsistenciaPageModule)
  },
  {
    path: 'detalle/:asistenciaId',
    pathMatch: 'full',
    loadChildren: () => import('./detalle-asistencia/detalle-asistencia.module').then(m => m.DetalleAsistenciaPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'registrar-asistencia',
    loadChildren: () => import('./asistencia/registrar-asistencia/registrar-asistencia.module').then(m => m.RegistrarAsistenciaPageModule)
  },
  {
    path: 'principal',
    loadChildren: () => import('./principal/principal.module').then(m => m.PrincipalPageModule)
  },
  {
    path: 'tab1',
    loadChildren: () => import('./tab1/tab1.module').then( m => m.Tab1PageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
