import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import { Store } from '@ngrx/store';
import * as fromAuth from '@store/auth/auth.reducer'
import * as AuthActions from '@store/auth/auth.actions'
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthFacadeService {

  constructor(
    private auth: AngularFireAuth,
    private store: Store<fromAuth.State>,
    private router: Router
  ) { }


  getCurrentUser(): Observable<User | null> {
    return this.store.select(fromAuth.getUser)
  }

  setCurrentUser(user: User) {
    this.store.dispatch(AuthActions.setUser({ user: JSON.parse(JSON.stringify(user)) }))
  }

  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((value) => {
      this.setCurrentUser(value.user as User)
      this.router.navigateByUrl('/timer');
    })

  }

  anonymous() {
    this.auth.signInAnonymously().then(
      (value) => {
        this.setCurrentUser(value.user as User)
        this.router.navigateByUrl('/timer');
      }
    )
  }

}
