import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MenuItem } from 'primeng/api';
import firebase from 'firebase/compat/app';
// import { GoogleAuthProvider, UserCredential } from 'firebase/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(public auth: AngularFireAuth) {
  }

  title = 'pomodoro-at';
  displayName: string = '';
  menuItems: MenuItem[] = [] ;
  ngOnInit(): void {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((value) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      // const credential = GoogleAuthProvider.credentialFromResult(value);
      // const token = credential?.accessToken;
      // The signed-in user info.
      const user = value.user;
      this.displayName = user?.displayName as string;

      // ...
    })
    this.menuItems = [
      {
          label: 'Temporizador',
          icon: "pi pi-clock",
          routerLink: "/timer"
      },
      {
          label: 'Registros',
          icon: "pi pi-list",
          routerLink: "/records"
      },
      {
          label: 'Configuración',
          icon: "pi pi-cog",
          routerLink: "/settings"
      }
  ];
  }
}
