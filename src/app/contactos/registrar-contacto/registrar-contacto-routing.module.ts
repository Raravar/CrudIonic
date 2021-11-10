import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrarContactoPage } from './registrar-contacto.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrarContactoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrarContactoPageRoutingModule {}
