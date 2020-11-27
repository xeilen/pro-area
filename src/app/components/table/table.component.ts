import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../firebase.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  data: object;
  isAdmin: boolean;
  isChangeMode = false;
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'role'];

  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;

  constructor(private fireBaseService: FirebaseService,
              private router: Router) {}

  ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    if (!currentUser) {
      this.router.navigate(['/login']);
    }
    this.isAdmin = currentUser?.role === 'admin';
    if (this.isAdmin) {
      this.displayedColumns = ['id', ...this.displayedColumns, 'option'];
    }
    this.data = this.fireBaseService.getData();
  }

  handleChangeFlag(): any {
    this.isChangeMode = !this.isChangeMode;
  }

  onDelete(id): any {
    this.fireBaseService.deleteUser(id);
    this.isChangeMode = false;
  }

  updateUser(user): any {
    if (!this.isChangeMode) {
      this.id = user.id;
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.email = user.email;
      this.role = user.role;
      this.handleChangeFlag();
    } else {
      this.fireBaseService.updateUserData({
        id: this.id,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        role: this.role
      });
      this.isChangeMode = false;
    }
  }

}
