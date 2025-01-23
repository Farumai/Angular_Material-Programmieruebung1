import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StoreService } from './store.service';
import { Course } from './Interfaces/Course';
import { Registration } from './Interfaces/Registration';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private baseUrl = 'http://localhost:5000';

  constructor(private http: HttpClient, private storeService: StoreService) { }

  public getCourses() {
      this.http.get<Course[]>('http://localhost:5000/courses?_expand=eventLocation').subscribe(data => {
        this.storeService.courses = data;
        this.storeService.cousesLoading = false;
      });
  }

  public getRegistrations(page: number): void {
    const options = {
      observe: 'response' as const,
      params: {
        _expand: 'course',
        _page: page.toString(),
        _limit: '2',
        _sort: this.storeService.sortField,
        _order: this.storeService.sortOrder,
      },
    };
  
    this.http.get<Registration[]>(`${this.baseUrl}/registrations`, options).subscribe((data) => {
      this.storeService.registrations = data.body!.map((registration) => ({
        ...registration,
        isDeleting: false, 
      }));
      this.storeService.registrationTotalCount = Number(data.headers.get('X-Total-Count'));
      this.storeService.registrationsLoading = false;
    });
  }

  public addRegistration(registration: any, page: number): void {
    const newRegistration = {
      ...registration,
      registrationDate: new Date().toISOString()
    };

    this.http.post(`${this.baseUrl}/registrations`, newRegistration).subscribe(() => {
      this.getRegistrations(page);
    });
  }

  public deleteRegistration(registrationId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/registrations/${registrationId}`);
  }
}
