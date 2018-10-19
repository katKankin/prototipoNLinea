import { NgModule } from '@angular/core';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';


import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// ese commonmodule viene con el ng4, pipes, etc

// esto es para el sidebar, para q funcione el router link
/*imports: [
    RouterModule
],*/
@NgModule({
    imports: [
        RouterModule,
        CommonModule
    ],
    declarations: [
        NopagefoundComponent,
        HeaderComponent,
        SidebarComponent
    ],
    exports: [
        NopagefoundComponent,
        HeaderComponent,
        SidebarComponent
    ]
})
export class SharedModule { }
