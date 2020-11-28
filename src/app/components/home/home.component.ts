import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  constructor(private fireBaseService: FirebaseService,
              private router: Router) { }

  loggedUserName: string;

  ngOnInit(): void {
    this.loggedUserName = JSON.parse(localStorage.getItem('user'))?.firstName;
  }

  logOut(): any {
    this.fireBaseService.logout()
      .then(_ => this.router.navigate(['/login']));
  }
}
