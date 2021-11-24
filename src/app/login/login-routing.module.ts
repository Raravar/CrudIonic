import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPage } from './login.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  },
  {
    path: 'registra-usuario',
    loadChildren: () => import('./registra-usuario/registra-usuario.module').then( m => m.RegistraUsuarioPageModule)
  },
  {
    path: 'recuperar',
    loadChildren: () => import('./recuperar/recuperar.module').then( m => m.RecuperarPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
