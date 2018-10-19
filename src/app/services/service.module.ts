
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


import {
  SidebarService,
  GameService,
  MenuService
} from './service.index';
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SidebarService,
    GameService,
    MenuService

  ],
  declarations: []
})
export class ServiceModule { }
