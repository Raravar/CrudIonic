import { Component, OnInit } from '@angular/core';
import { AsistenciaService } from './asistencia.service';
import { Asistencia } from './asistencia.model';
@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {
  listaAsistencias  =[];
  asistenciaService: AsistenciaService;

  constructor(  asistenciaService: AsistenciaService ) {
    this.asistenciaService=asistenciaService;
  }
 ngOnInit() {
   this.listaAsistencias=this.asistenciaService.getAsistencias();
 }
 ionViewWillEnter() {
  // alert("XXX");
 this.listaAsistencias=this.asistenciaService.getAsistencias();
}

}
