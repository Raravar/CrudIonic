import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Asistencia} from '../asistencia/asistencia.model';
import { AsistenciaService} from '../asistencia/asistencia.service';


@Component({
  selector: 'app-detalle-asistencia',
  templateUrl: './detalle-asistencia.page.html',
  styleUrls: ['./detalle-asistencia.page.scss'],
})
export class DetalleAsistenciaPage implements OnInit {

  asistencia={
    id:'',
    asignatura:'',
    seccion:'',
    sesion:''
  };
asistenciaService: AsistenciaService;

campo: string;

constructor(private router: Router,private activateRoute: ActivatedRoute,
  asistenciaService: AsistenciaService,public toastController: ToastController) {
       this.asistenciaService=asistenciaService;
       this.activateRoute.paramMap.subscribe(
        paramMap=>{
          const idAsistenciaRecibido=paramMap.get('asistenciaId');
          alert(idAsistenciaRecibido);
         this.asistenciaService.getAsistencia(idAsistenciaRecibido).then(res=>{
         this.asistencia=res;
         this.asistencia.id=idAsistenciaRecibido;
          });
        }
      );
      }

  ngOnInit() {
    this.activateRoute.paramMap.subscribe(
      paramMap=>{
        const idAsistenciaRecibido=paramMap.get('asistenciaId');
        alert(idAsistenciaRecibido);
       this.asistenciaService.getAsistencia(idAsistenciaRecibido).then(res=>{
       this.asistencia=res;
       this.asistencia.id=idAsistenciaRecibido;
        });
      }
    );
  }

  actualizarAsistencia()
  {
    // Se declara e instancia un elemento de tipo NavigationExtras
    if(this.validateModel(this.asistencia)){
      alert('Inicia Actualiza');
      alert('id: '+this.asistencia.id);
      alert('Asignatura: '+this.asistencia.asignatura);
        this.asistenciaService.updateAsistencia(
          this.asistencia.id,
          this.asistencia.asignatura.valueOf(),
          this.asistencia.seccion.valueOf(),
          this.asistencia.sesion.valueOf());
          this.presentToast('Datos correctamente actualizados');

          alert('Fin Actualiza');
    }
    else
    {
      this.presentToast('Falta completar: '+this.campo);
    }

  }
 borrarAsistencia(){
  alert('Inicia delete');
    // Se declara e instancia un elemento de tipo NavigationExtras
        this.asistenciaService.deleteAsistencia(this.asistencia.id);
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
