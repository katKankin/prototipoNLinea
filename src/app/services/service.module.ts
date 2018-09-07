import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import {
  SettingsService,
  SidebarService,
  SharedService,
  GameService
} from './service.index';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    GameService

  ],
  declarations: []
})
export class ServiceModule { }
