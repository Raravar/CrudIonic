import { Platform, AlertController } from '@ionic/angular';

import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

import { Asistencia } from '../asistencia/asistencia.model';



@Injectable({
  providedIn: 'root'
})
export class DataBaseService {

  private dbReady = new BehaviorSubject<boolean>(false);
  private dataBase: SQLiteObject;
  private http: HttpClient;
  private  sqlPorter: SQLitePorter;
  private sqlite: SQLite;

  listaAsistencias = new BehaviorSubject([]);

  private asistencia: Asistencia;



  constructor( http: HttpClient,plataforma: Platform,sqlite: SQLite, sqlPorter: SQLitePorter)
  {
 plataforma.ready()
   .then(() => {
      this.sqlite=sqlite;
      this.http=http;
      this.sqlPorter=sqlPorter;
      // Crear o abrir la base de datos DataBaseProyectoUno.db;
      this.sqlite.create({
        name: 'DataBaseProyectoUno.db',
        location: 'default',
        createFromLocation: 1
      })
      .then((db: SQLiteObject) => {
        
        this.dataBase = db;
        this.crearTablas();
        
        }).catch(e =>{
          alert('Error conexión'  );
          console.error(e);
          console.error('Error Conexión '+ e.message);
        });
   }).catch(e => alert('Plataforma no leida.'));
  }
  crearTablas() {
    // Obtener el archivo que contiene las sentencias SQL
  this.http.get('../assets/db/CreateDatabase.sql',{responseType: 'text'})
      .subscribe(sql => {
        // Ejecutar las sentencias SQL del archivo
        this.sqlPorter.importSqlToDb(this.dataBase, sql)
          .then(async _ => {
            // Informar que la base de datos está lista
            
             this.cargarAsistencia();
            
            this.dbReady.next(true);
            
          }).catch(e => {
            alert('Error al importar la base de datos');
            console.error(e);
            console.error('Error al importar la base de datos', e.message);
          });
      });
    }


  getDatabaseState() {
    return this.dbReady.asObservable();
  }

 getAsistencias(): Observable<Asistencia[]>{
          return this.listaAsistencias.asObservable();
  }

  cargarAsistencia(){
    return this.dataBase.executeSql('SELECT * FROM asistencia', []).then(data => {
      let asistencia : Asistencia[] = [];

      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
            asistencia.push(
              data.rows.item(i));
        }
      }
      this.listaAsistencias.next(asistencia);
    });
  }

getAsistencia(id): Promise<Asistencia> {
  return this.dataBase.executeSql('SELECT * FROM asistencia WHERE id = ?', [id]).then(resSelect => { 
      return {
            id: resSelect.rows.item(0).id,
            asignatura: resSelect.rows.item(0).asignatura,
            seccion: resSelect.rows.item(0).seccion,
            sesion: resSelect.rows.item(0).sesion
      }
    });
  }


  addAsistencia(asignatura, seccion, sesion) {
    let data = [ asignatura, seccion,sesion];
    return this.dataBase.executeSql('INSERT INTO asistencia (asignatura, seccion, sesion) VALUES (?, ?, ?)', data)
    .then(res => {
     this.cargarAsistencia();
    });
  }
  updateAsistencia( asignatura, seccion,sesion,id) {
    let data = [ asignatura, seccion,sesion,id];
    return this.dataBase.executeSql('UPDATE asistencia SET asignatura=?, seccion=?, sesion=? WHERE id=?', data)
    .then(res => {
     this.cargarAsistencia();
    });
  }

 deleteAsistencia(id) {
    alert('Delete '+id);
    let data = [ id];
    return this.dataBase.executeSql('DELETE FROM asistencia  WHERE id=?', data)
    .then(res => {
     this.cargarAsistencia();
    });
  }
}
