import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';
import { PAGES_ROUTES } from './pages.routes';

import { SharedModule } from '../shared/shared.module';

// ng2 charts, para la parte de pages/gráficas
// import { ChartsModule } from 'ng2-charts';


import { PagesComponent } from './pages.component';

import { DashboardComponent } from './dashboard/dashboard.component';


import { IncrementadorComponent } from '../components/incrementador/incrementador.component';

import { MenuComponent } from './menu/menu.component';



@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        IncrementadorComponent,
        MenuComponent
    ],
    exports: [
        DashboardComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        ColorPickerModule,
        PAGES_ROUTES,
        FormsModule /* ,
        ChartsModule // es del ng2 charts */
    ]
})
export class PagesModule { }
