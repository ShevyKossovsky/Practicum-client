import { Injectable } from '@angular/core';
import { GlobalService } from '../global.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  url!: string;
  constructor(private http: HttpClient, private globalService: GlobalService) {
    this.url = `${globalService.domainUrl}/Employees`;
  }
  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.url)
  }
  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.url}/${id}`)
  }
  addEmployee(employee: Employee): Observable<Employee[]> {
    return this.http.post<Employee[]>(this.url, employee)
  }

  updateEmployee(id: number, employee: Employee): Observable<Employee> {

    return this.http.put<Employee>(`${this.url}/${id}`, employee)
  }

  deleteEmployee(id: number): Observable<Employee> {
    return this.http.delete<Employee>(`${this.url}/${id}`);
  }
}
