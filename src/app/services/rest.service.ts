import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';


interface Dato {
  userId: string;
  id: string;
  title: string;
  body: string;
}



@Injectable({
  providedIn: 'root'
})


export class RestService {

  dato:Dato;




  public baseUrl = 'https://jsonplaceholder.typicode.com/posts';


  constructor(
      private httpClient: HttpClient ) {  }
      
  get_Datos() {
    return this.httpClient.get(this.baseUrl );
  }

  get_DatosUserId(id) {
    let stringUrl=this.baseUrl +'?userId='+id;
    alert("----->>>"+stringUrl);
    return this.httpClient.get(stringUrl );
  }
 get_DatosPos(id): Observable<Dato>{
  
    let stringUrl=this.baseUrl +'/'+id;
    alert("----->>>"+stringUrl);
    return  this.httpClient.get<Dato>(stringUrl);
}

}