import { Injectable } from '@angular/core';
import { Asistencia } from './asistencia.model';
import { DataBaseService } from '../servicios/data-base.service';


@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {

   public listaAsistencia: Asistencia[] = [];
   asistencia: Asistencia;
   db: DataBaseService;

   constructor( db: DataBaseService) {
     this.db=db;
    // alert('xxxx-0 ');
  }
  getDabaseState()
  {
    return this.db.getDatabaseState();
  }
  getAsistencias()
  {
    // alert('xxxx-6 ');
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getAsistencias().subscribe(asistencia => {
          this.listaAsistencia = asistencia;
        });
      }
    });
    return this.listaAsistencia;
  }
  getAsistencia(idAsistencia: string): Promise<Asistencia>
  {
    // alert('xxxx-7');

      return this.db.getAsistencia(idAsistencia).then(data => {
          this.asistencia = data;
          // alert('xxxx-8');
          return this.asistencia;
       });
   }


addAsistencia(asistencia: string, seccion: string, sesion: string)
  {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.addAsistencia(asistencia,seccion,sesion);
      }
    });
  }
  
updateAsistencia(id: string, asistencia: string, seccion: string, sesion: string)
  {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        alert('Actualiza Datos');
        this.db.updateAsistencia(asistencia,seccion,sesion,id);
      }
    });
  }

  deleteAsistencia(id: string)
  {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.deleteAsistencia(id);
      }
    });
  }
}