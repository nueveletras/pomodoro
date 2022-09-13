import { Component, OnInit } from '@angular/core';
import { AuthFacadeService } from '../shared/services/auth-facade.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  constructor(
    public authFacade: AuthFacadeService,

  ) { }

  login(){
    this.authFacade.login()
  }

  anonymous(){
    this.authFacade.anonymous()
  }

}
