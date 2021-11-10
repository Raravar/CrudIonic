import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ContactosService} from '../contactos.service';

@Component({
  selector: 'app-registra-contacto',
  templateUrl: './registrar-contacto.page.html',
  styleUrls: ['./registrar-contacto.page.scss'],
})
export class RegistrarContactoPage implements OnInit {
  contacto={
    nombre:'',
    apellidos:'',
    domicilio:'',
    email:'',
    fono:''
  };
  contactoService: ContactosService;
  campo: string;
  constructor(private router: Router,public toastController: ToastController,
    contactoService: ContactosService) {
      this.contactoService=contactoService;
     }

  ngOnInit() {
  }
  registrarContacto(){
    // Se declara e instancia un elemento de tipo NavigationExtras
    if(this.validateModel(this.contacto)){
        this.contactoService.addContacto(this.contacto.nombre.valueOf(),
          this.contacto.apellidos.valueOf(),
          this.contacto.domicilio.valueOf(),
          this.contacto.email.valueOf(),
          this.contacto.fono.valueOf());
          this.presentToast('Datos registrados correctamente');
    }
    else
    {
      this.presentToast('Falta completar: '+this.campo);
    }

  }
   /**
   * Muestra un toast al usuario
   * @param message Mensaje a presentar al usuario
   * @param duration Duración el toast, este es opcional
   */
    async presentToast(message: string, duration?: number){
      const toast = await this.toastController.create(
        {
          message,
          duration:duration?duration:2000
        }
      );
      toast.present();
    }
  /**
   * validateModel sirve para validar que se ingrese algo en los
   * campos del html mediante su modelo
   */
    validateModel(model: any){
    // Recorro todas las entradas que me entrega Object entries y obtengo su clave, valor
    for (var [key, value] of Object.entries(model)) {
      // Si un valor es "" se retornara false y se avisara de lo faltante
      if (value==='') {
        // Se asigna el campo faltante
        this.campo=key;
        // Se retorna false
        return false;
      }
    }
    return true;
  }
}
