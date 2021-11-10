import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrarContactoPageRoutingModule } from './registrar-contacto-routing.module';

import { RegistrarContactoPage } from './registrar-contacto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrarContactoPageRoutingModule
  ],
  declarations: [RegistrarContactoPage]
})
export class RegistrarContactoPageModule {}
