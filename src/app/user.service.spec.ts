import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  // Set up the test environment
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  //kancleaniw apres kula test
  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

 
  it('should post user data to the server', () => {
    const data = { firstName: 'John', lastName: 'Doe', telephone: '1234567890', email: 'john@example.com' };
    service.postUser(data).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne('http://localhost:3000/users');// hna kanverifiw si la requette http est envoye avec l url
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(data); 
    req.flush(data);//// hna on simule la réponse de la requete/ data est renvoye fhal reponse de la requete HTTP
  });

  
  it('should get users from the server', () => {
    const mockUsers = [
      { id: 1, firstName: 'John', lastName: 'Doe', telephone: '1234567890', email: 'john@example.com' },
      { id: 2, firstName: 'Jane', lastName: 'Doe', telephone: '0987654321', email: 'jane@example.com' }
    ];

    service.getUsers().subscribe(users => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne('http://localhost:3000/users');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  
  it('should get a user by ID from the server', () => {
    const user = { id: 2, firstName: 'Jane', lastName: 'Doe', telephone: '0987654321', email: 'jane@example.com' };

    service.getUser(2).subscribe(result => {
      expect(result).toEqual(user);
    });

    const req = httpMock.expectOne('http://localhost:3000/users/2');
    expect(req.request.method).toBe('GET');
    req.flush(user);
  });

 
  it('should delete a user by ID from the server', () => {
    service.DeleteUser(2).subscribe(response => {
      expect(response).toBeNull();
    });
  
    const req = httpMock.expectOne('http://localhost:3000/users/2');
    expect(req.request.method).toBe('DELETE');
    req.flush(null); ;
  });

 
  it('should update user data on the server', () => {
    const data = { firstName: 'John', lastName: 'Doe', telephone: '1234567890', email: 'john@example.com' };

    service.updateUser(2, data).subscribe(result => {
      expect(result).toEqual(data);
    });

    const req = httpMock.expectOne('http://localhost:3000/users/2');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(data);
    req.flush(data);
  });
});
