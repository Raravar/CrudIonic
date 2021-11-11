import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {RestService} from '../services/rest.service';


@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
    
    public datosObservable: Observable<any>;

    constructor(private restService: RestService) {
        this.datosObservable = this.restService.get_Datos();
    }

    ngOnInit() {

    }
}
