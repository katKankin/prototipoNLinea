import { Component, OnInit } from '@angular/core';
import { SidebarService, MenuService } from '../../services/service.index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
  name: string;
  constructor( public _sidebar: SidebarService, public _settingsService: MenuService ) { 
    this._settingsService.retrieveData().subscribe(
      result => { // llamar no a un service si no hacer la petición directamente

        this.name = result.name; // verificar el dato de otra manera
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  ngOnInit() {
  }

}
