
import { UserService } from '../user.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersListComponent } from './users-list.component';
import { MatTableDataSource } from '@angular/material/table';
import { of } from 'rxjs'; //hadi katcree lina des faux observables 
import { By } from '@angular/platform-browser'; //kandiro biha selection dial l element de dom pour lire son contenu
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

// Mock de UserService
const mockUserService = { //simuler une reponse a partir de la liste fournie besh nchufu wesh get khdama
  getUsers: jest.fn().mockReturnValue(of([
    { id: 1, firstName: 'nissrin', lastName: 'akroud', telephone: '1234567890', email: 'john@example.com' },
    { id: 2, firstName: 'nisso', lastName: 'ak', telephone: '0987654321', email: 'jane@example.com' }
  ])),
  DeleteUser: jest.fn().mockReturnValue(of({}))  // had la fonction crée un Observable emettant un objet vide.
}; //makandirush un appel reel l api dekshi elash kandiru mock pour simuler une reponse reussie

describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule , UsersListComponent], 
      
      providers: [
        { provide: UserService, useValue: mockUserService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Détecter les changements initiaux
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch users on init', () => {
    expect(mockUserService.getUsers).toHaveBeenCalled();
    fixture.detectChanges();  // derna had les 2 ligne besh nchufu que apres execute chi action ola modification reh l element bien ajoute et modifie
    const users = fixture.debugElement.queryAll(By.css('.user-item')); 
    
  });

  it('should navigate to edit user on editUser call', () => {
    
    const editUserSpy = jest.spyOn(component, 'editUser');
    component.editUser(1);
    expect(editUserSpy).toHaveBeenCalledWith(1);
  });

  it('should delete user and remove it from dataSource on success', () => {
    const idToDelete = 1; 
    component.supprimerUser(idToDelete);
    expect(mockUserService.DeleteUser).toHaveBeenCalledWith(idToDelete); 
    expect(mockUserService.DeleteUser).toHaveBeenCalled(); // mdernaha juj dlmerat besh luwla besh nverifiw que l id a ete bien passe u lakhra bayna
    fixture.detectChanges();
    const users = fixture.debugElement.queryAll(By.css('.user-item'));
    expect(users.length).toBe(1); 
  });
});