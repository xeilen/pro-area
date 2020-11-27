import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  errorMessage: string;

  constructor(private fireBaseService: FirebaseService) { }

  currUser = JSON.parse(localStorage.getItem('user')) || null;

  ngOnInit(): void {
    console.log(this.fireBaseService);
  }

  singIn(email, password): any {
    this.fireBaseService.login(email, password)
      .then(_ => {
        this.errorMessage = '';
      })
      .catch(e => this.errorMessage = e.message);
  }
}
