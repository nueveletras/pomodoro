import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { TopbarComponent } from './topbar/topbar.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { TabMenuModule } from 'primeng/tabmenu';


@NgModule({
  declarations: [
    TopbarComponent,
    FooterComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    TabMenuModule,

  ],
  exports:[
    TopbarComponent,
    FooterComponent,
    MenuComponent
  ]
})
export class LayoutModule { }
