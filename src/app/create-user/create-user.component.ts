// create-user.component.ts
import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'] // Corrected typo from styleUrl to styleUrls
})
export class CreateUserComponent implements OnInit {
  userForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    address: new FormControl('')
  });

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  onSubmit() {
    this.userService.postUser(this.userForm.value).subscribe({
      next: (response) => {
        console.log('User created successfully:', response);
        // Handle successful response
      },
      error: (error) => {
        console.error('Error creating user:', error);
        // Handle error response
      }
    });
  }
}
