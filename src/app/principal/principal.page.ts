import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from '../login/registra-usuario/usuario.model';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  usuario:Usuario;
  datosUsuario: any;
  constructor(
    private activeroute: ActivatedRoute, 
    private router: Router,



  ) { }

  ngOnInit() {
    this.activeroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.datosUsuario = this.router.getCurrentNavigation().extras.state.user;
      } 
    });
    
    console.log(this.datosUsuario)
   
  }
}

  
