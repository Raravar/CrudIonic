import { UsuarioService } from '../registra-usuario/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Usuario } from '../registra-usuario/usuario.model';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {
  /**
   * Se genera el modelo user con dos claves
   * cada clave tiene su valor inicial
   */
  user = {
    usuario: '',
    password:''
  };
  usuarioServiceS: Usuario;
  //variable para mostrar el campo faltante
  campo: string;

  constructor(private router: Router, private toastController: ToastController,
    private usuarioService: UsuarioService) { } // Se debe instanciar

  ngOnInit() {

  }
  recuperar() {
    if(this.validateModel(this.user)){
      this.usuarioServiceS=this.usuarioService.getUsuario(this.user.usuario);
      if(this.usuarioServiceS.user === this.user.usuario){
       let resultado: boolean;
       resultado=this.usuarioService.addPassword(this.usuarioServiceS.user,this.user.password);
       if (resultado){
        this.presentToast('Contraseña modificada correctamente');
        this.router.navigate(['/login']);
       }else{
        this.presentToast('Error al cambiar la contraseña');
       }
       
      }else{
        this.presentToast('Usuario no valido');
      }
    }
    else
    {
      this.presentToast('Por favor complete los datos. ');
    }   
  }
    
  /**
   *    * Muestra un toast al usuario
  * @param message Mensaje a presentar al usuario
  * @param duration Duración el toast, este es opcional
  */
  async presentToast(message: string, duration?: number) {
    const toast = await this.toastController.create(
      {
        message,
        duration: duration ? duration : 2000
      }
    );
    toast.present();
  }
  /**
   * validateModel sirve para validar que se ingrese algo en los
   * campos del html mediante su modelo
   */
  validateModel(model: any) {
    // Recorro todas las entradas que me entrega Object entries y obtengo su clave, valor
    for (const [key, value] of Object.entries(model)) {
      // Si un valor es "" se retornara false y se avisara de lo faltante
      if (value === '') {
        // Se asigna el campo faltante
        this.campo = key;
        // Se retorna false
        return false;
      }
    }
    return true;
  }
}