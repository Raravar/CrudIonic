import { Injectable } from '@angular/core';
import { Contacto } from './contacto.model';
import { DataBaseService } from '../servicios/data-base.service';


@Injectable({
  providedIn: 'root'
})
export class ContactosService {

   public listaContactos: Contacto[] = [];
   contacto: Contacto;
   db: DataBaseService;

   constructor( db: DataBaseService) {
     this.db=db;
    alert('xxxx-0 ');
  }
  getDabaseState()
  {
    return this.db.getDatabaseState();
  }
  getContactos()
  {
    alert('xxxx-6 ');
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getContactos().subscribe(contactos => {
          this.listaContactos = contactos;
        });
      }
    });
    return this.listaContactos;
  }
  getContacto(idContacto: string): Promise<Contacto>
  {
    alert('xxxx-7');

      return this.db.getContacto(idContacto).then(data => {
          this.contacto = data;
          alert('xxxx-8');
          return this.contacto;
       });
   }


addContacto(nombre: string, apellidos: string, domicilio: string, email: string, fono: string)
  {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.addContacto(nombre,apellidos,domicilio,email,fono);
      }
    });
  }
  
updateContacto(id: string,nombre: string, apellidos: string, domicilio: string, email: string, fono: string)
  {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        alert('Actualiza Datos');
        this.db.updateContacto(nombre,apellidos,domicilio,email,fono,id);
      }
    });
  }

  deleteContacto(id: string)
  {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.deleteContacto(id);
      }
    });
  }
}