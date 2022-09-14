import { Component, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent {

  @Input () loggedIn!: boolean
  @Input () menuItems!: MenuItem[]

}
