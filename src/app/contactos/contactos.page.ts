import { Component, OnInit } from '@angular/core';
import { ContactosService } from './contactos.service';
import { Contacto} from './contacto.model';
@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.page.html',
  styleUrls: ['./contactos.page.scss'],
})
export class ContactosPage implements OnInit {
  listaContactos  =[];
  contactoService: ContactosService;

  constructor(  contactoService: ContactosService ) {
    this.contactoService=contactoService;
  }
 ngOnInit() {
   this.listaContactos=this.contactoService.getContactos();
 }
 ionViewWillEnter() {
  alert("XXX");
 this.listaContactos=this.contactoService.getContactos();
}

}
