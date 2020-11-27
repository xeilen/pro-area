import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../firebase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;

  errorMessage: string;

  constructor(private fireBaseService: FirebaseService) { }

  checked: boolean;

  ngOnInit(): void {
  }

  createNewUser(user): any {
    this.fireBaseService.createNewAccount(user)
      .then(_ => {
        this.errorMessage = '';
      })
      .catch(e => this.errorMessage = e.message);
  }
}
