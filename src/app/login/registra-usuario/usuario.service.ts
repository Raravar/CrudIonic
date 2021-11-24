import { Injectable } from '@angular/core';
import { Usuario } from './usuario.model';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  listaUsuario: Usuario[]=[
    {
      nombre: 'Nico',
      apellidos:'carva',
      user:'crv',
      password: '123'
    }
];
  constructor() {
  }
  getUsuario(usuarioInput: string)
  {
    return {
            ...this.listaUsuario.find(usuario => {return usuario.user === usuarioInput })
           }
    }
  addUsuario(nombre: string, apellidos: string, user: string, password: string)
  {
    this.listaUsuario.push(
      {
        nombre,
        apellidos,
        user,
        password

      }
    );   
  }
  addPassword(usuario: string,newPassword: string){
    let salida: boolean;
    salida=false;
    for (var i = 0; i < this.listaUsuario.length; i++) {
      if (this.listaUsuario[i].user===usuario){
        this.listaUsuario[i].password = newPassword;
        salida=true;
      }      
     }
     return salida
    
  }
}


