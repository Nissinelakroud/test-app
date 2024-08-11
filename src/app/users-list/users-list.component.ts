import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserService } from '../user.service';
import { User } from '../models/user.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DatePipe } from '@angular/common';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
  imports: [
    MatTableModule, 
    MatSortModule, 
    MatPaginatorModule,
    MatFormField,
    MatLabel,
    MatIconModule,
    MatButtonModule
  ],
})
export class UsersListComponent implements AfterViewInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'telephone','email', 'actions'];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userapi: UserService, private router: Router) {
    this.dataSource = new MatTableDataSource<User>();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() { 
    this.fetchUsers();
  }

  fetchUsers() {
    this.userapi.getUsers().subscribe((data: User[]) => {
      console.log(data);
      this.dataSource.data = data;
    });
  }
  
  editUser(id: number) {
    this.router.navigate([`/create/${id}`])
  }

  
    deleteUser(id: number) {
      console.log("id:",  id)

      this.userapi.DeleteUser(id).subscribe({
        next: (response) => {
          console.log('User deleted successfully:', response);
          this.userapi.getUsers() ;
        },
        error: (error) => {
          console.error('Error creating user:', error);
          
        }
      });
  } }