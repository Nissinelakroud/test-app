import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateUserComponent } from './create-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'; // Ajoutez ceci
import { UserService } from '../user.service'; // Assurez-vous que le service est disponible
import { of } from 'rxjs'; // Pour simuler les appels au service

describe('CreateUserComponent', () => {
  let component: CreateUserComponent;
  let fixture: ComponentFixture<CreateUserComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CreateUserComponent, // Incluez le composant standalone ici
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatSelectModule,
        CommonModule,
        RouterTestingModule,
        NoopAnimationsModule 
      ],
      providers: [
        {
          provide: UserService,
          useValue: { 
            postUser: () => of({}), 
            updateUser: () => of({}),
            getUser: () => of({}),
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should require firstName and email fields', () => {
    const firstNameControl = component.userForm.get('firstName');
    const lastNameControl = component.userForm.get('lastName');
    const emailControl = component.userForm.get('email');
    lastNameControl?.setValue('');
    firstNameControl?.setValue('');
    emailControl?.setValue('');
    expect(lastNameControl?.valid).toBeFalsy();
    expect(firstNameControl?.valid).toBeFalsy();
    expect(emailControl?.valid).toBeFalsy(); 

    lastNameControl?.setValue('nissrin');
    firstNameControl?.setValue('nisso');
    emailControl?.setValue('nisso@example.com');
   expect(lastNameControl?.valid).toBeTruthy();
    expect(firstNameControl?.valid).toBeTruthy();
    expect(emailControl?.valid).toBeTruthy();
  });  
  it('should call updateUser when updating  user', () => {
    const updateUserSpy = jest.spyOn(component['userService'], 'updateUser');
    component.userForm.setValue({
      firstName: 'Jane',
      lastName: 'Doe',
      address: '456 Main St',
      email: 'jane@example.com',
      telephone: '0987654321',
      ville: 'casablanca'
    });
  
    
    component['route'].snapshot.params['id'] = 1;
  
    component.submit();
  
    expect(updateUserSpy).toHaveBeenCalled();
  });
  it('should navigate to the user list on cancel', () => {
    const navigateSpy = jest.spyOn(component['router'], 'navigate');
  
    component.cancel();
  
    expect(navigateSpy).toHaveBeenCalledWith(['/list']);
  });
  
  //besh nchufu wesh la fonction post appele fesh lformulaire ki3mer
  it('should call postUser when creating a new user', () => {
    const postUserSpy = jest.spyOn(component['userService'], 'postUser');
    // hna derna la Creation d un espion (spy) sur la méthode postUser de l'instance du service UserService 
    //li ste3mlnaha f le composant. Cela permet de vérifier si la méthode a été appelée
    // pendant le test sans  exécuter la méthode postUser.
    component.userForm.setValue({
      firstName: 'John',
      lastName: 'Doe',
      address: '123 Main St',
      email: 'john@example.com',
      telephone: '1234567890',
      ville: 'rabat'
    });
    component.submit();
  
    expect(postUserSpy).toHaveBeenCalled();
  });
});
