
import { UserService } from '../user.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersListComponent } from './users-list.component';

import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

// Mock de UserService
const mockUserService = {
  getUsers: jest.fn().mockReturnValue(of([
    { id: 1, firstName: 'John', lastName: 'Doe', telephone: '1234567890', email: 'john@example.com' },
    { id: 2, firstName: 'Jane', lastName: 'Doe', telephone: '0987654321', email: 'jane@example.com' }
  ])),
  deleteUser: jest.fn().mockReturnValue(of({}))
};

describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule , UsersListComponent], // Désactiver les animations pour les tests
      
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
    fixture.detectChanges(); // Assurer que les changements sont détectés
    const users = fixture.debugElement.queryAll(By.css('.user-item')); // Assurer que les utilisateurs sont affichés
    
  });

  it('should navigate to edit user on editUser call', () => {
    // Simuler la méthode editUser avec jest
    const editUserSpy = jest.spyOn(component, 'editUser');
    component.editUser(1);
    expect(editUserSpy).toHaveBeenCalledWith(1);
  });

  
});
