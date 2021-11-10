import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Contacto} from '../contactos/contacto.model';
import { ContactosService} from '../contactos/contactos.service';

@Component({
  selector: 'app-detalle-contacto',
  templateUrl: './detalle-contacto.page.html',
  styleUrls: ['./detalle-contacto.page.scss'],
})
export class DetalleContactoPage implements OnInit {

  contacto={
    id:'',
    nombre:'',
    apellidos:'',
    domicilio:'',
    email:'',
    fono:''
  };
contactoService: ContactosService;

campo: string;

constructor(private router: Router,private activateRoute: ActivatedRoute,
     contactoService: ContactosService,public toastController: ToastController) {
       this.contactoService=contactoService;
       this.activateRoute.paramMap.subscribe(
        paramMap=>{
          const idContactoRecibido=paramMap.get('contactoId');
          alert(idContactoRecibido);
         this.contactoService.getContacto(idContactoRecibido).then(res=>{
         this.contacto=res;
         this.contacto.id=idContactoRecibido;
          });
        }
      );
      }

  ngOnInit() {
    this.activateRoute.paramMap.subscribe(
      paramMap=>{
        const idContactoRecibido=paramMap.get('contactoId');
        alert(idContactoRecibido);
       this.contactoService.getContacto(idContactoRecibido).then(res=>{
       this.contacto=res;
       this.contacto.id=idContactoRecibido;
        });
      }
    );
  }

  actualizarContacto()
  {
    // Se declara e instancia un elemento de tipo NavigationExtras
    if(this.validateModel(this.contacto)){
      alert('Inicia Actualiza');
      alert('id: '+this.contacto.id);
      alert('Nombre: '+this.contacto.nombre);
        this.contactoService.updateContacto(
          this.contacto.id,
          this.contacto.nombre.valueOf(),
          this.contacto.apellidos.valueOf(),
          this.contacto.domicilio.valueOf(),
          this.contacto.email.valueOf(),
          this.contacto.fono.valueOf());
          this.presentToast('Datos correctamente actualizados');

          alert('Fin Actualiza');
    }
    else
    {
      this.presentToast('Falta completar: '+this.campo);
    }

  }
 borrarContacto(){
  alert('Inicia delete');
    // Se declara e instancia un elemento de tipo NavigationExtras
        this.contactoService.deleteContacto(this.contacto.id);
          this.presentToast('Datos correctamente eliminados');
          alert('Fin Delete');
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
