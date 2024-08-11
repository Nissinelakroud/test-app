import { Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { CreateUserComponent } from './create-user/create-user.component';

export const routes: Routes = [
    { path: '', redirectTo: 'create', pathMatch: 'full'},
    { path: 'list', component: UsersListComponent},
    { path: 'create', component: CreateUserComponent}
];
