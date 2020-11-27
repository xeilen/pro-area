import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import {map} from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public afs: AngularFirestore,
              public auth: AngularFireAuth,
              private router: Router) { }


  currUser: any;
  getData(): object {
    return this.afs.collection('users').snapshotChanges().pipe(
      map(changes => changes.map(c => ({
        // @ts-ignore
        ...c.payload.doc.data(),
        id: c.payload.doc.id
      })))
    );
  }

  deleteUser(id): any {
    this.afs.collection('users').doc(id).delete();
  }

  updateUserData(user): any {
    this.afs.collection('users').doc(user.id).update({
      ...user,
    });
  }

  insertNewUser(user): any {
    this.afs.collection('users').add({
      ...user,
      role: 'user'
    });
  }

  createNewAccount(user): any {
    return this.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then(u => console.log(u))
      .then(_ => this.insertNewUser(user))
      .then(_ => this.login(user.email, user.password));

  }

  login(email, password): any {
    return this.auth.signInWithEmailAndPassword(email, password)
      .then(user => {
        this.afs.collection('users').ref.where('email', '==', user.user.email)
          .onSnapshot(snapshot => {
            snapshot.forEach(userRef => {
              localStorage.setItem('user', JSON.stringify(userRef.data()));
              this.router.navigate(['/home']);
            });
          });
      });
  }

  logout(): any {
    localStorage.removeItem('user');
    return this.auth.signOut();
  }
}
