import { Platform, AlertController } from '@ionic/angular';

import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

import { Contacto } from '../contactos/contacto.model';



@Injectable({
  providedIn: 'root'
})
export class DataBaseService {

  private dbReady = new BehaviorSubject<boolean>(false);
  private dataBase: SQLiteObject;
  private http: HttpClient;
  private  sqlPorter: SQLitePorter;
  private sqlite: SQLite;

  listaContactos = new BehaviorSubject([]);

  private contacto: Contacto;



  constructor( http: HttpClient,plataforma: Platform,sqlite: SQLite, sqlPorter: SQLitePorter)
  {
    //Detectar Plataforma
    alert('xxxx-01');
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
        alert('xxxx-2');
        this.dataBase = db;
        this.crearTablas();
        alert('xxxx-1 ');
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
            alert('xxxx-3 ');
             this.cargarContactos();
            alert('xxxx-4 ');
            this.dbReady.next(true);
            alert('xxxx-5 ');
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

 getContactos(): Observable<Contacto[]>{
          return this.listaContactos.asObservable();
  }

  cargarContactos(){
    return this.dataBase.executeSql('SELECT * FROM contacto', []).then(data => {
      let contactos: Contacto[] = [];

      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
            contactos.push(
              data.rows.item(i));
        }
      }
      this.listaContactos.next(contactos);
    });
  }

getContacto(id): Promise<Contacto> {
  return this.dataBase.executeSql('SELECT * FROM Contacto WHERE id = ?', [id]).then(resSelect => { 
      return {
            id: resSelect.rows.item(0).id,
            nombre: resSelect.rows.item(0).nombre,
            apellidos: resSelect.rows.item(0).apellidos,
            domicilio: resSelect.rows.item(0).domicilio,
            email: resSelect.rows.item(0).email,
            fono: resSelect.rows.item(0).fono
      }
    });
  }


  addContacto(nombre, apellidos,domicilio,email,fono) {
    let data = [ nombre, apellidos,domicilio,email,fono];
    return this.dataBase.executeSql('INSERT INTO contacto (nombre, apellidos, domicilio, email,fono) VALUES (?, ?, ? ,? ,?)', data)
    .then(res => {
     this.cargarContactos();
    });
  }
  updateContacto(nombre, apellidos,domicilio,email,fono,id) {
    alert('Actualiza '+id);
    let data = [ nombre, apellidos,domicilio,email,fono,id];
    return this.dataBase.executeSql('UPDATE contacto SET nombre=?, apellidos=?, domicilio=?, email=?,fono=? WHERE id=?', data)
    .then(res => {
     this.cargarContactos();
    });
  }

 deleteContacto(id) {
    alert('Delete '+id);
    let data = [ id];
    return this.dataBase.executeSql('DELETE FROM contacto  WHERE id=?', data)
    .then(res => {
     this.cargarContactos();
    });
  }
}
