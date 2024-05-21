import { Component } from '@angular/core';
import { EmployeeService } from '../../../services/employee/employee.service';
import { Employee } from '../../../models/employee.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-birthday-reminder',
  standalone: true,
  imports: [

    CommonModule,
    DatePipe,
  ],
  templateUrl: './birthday-reminder.component.html',
  styleUrl: './birthday-reminder.component.scss'
})
export class BirthdayReminderComponent {


  employees!: Employee[];
  constructor(private employeeService: EmployeeService, private _snackBar: MatSnackBar) {

  }


  ngOnInit() {
    this.getEmployees();
    this.checkBirthdays();

  }
  getEmployees(): void {
    this.employeeService.getAllEmployees()
      .subscribe(employees => this.employees = employees);
  }
  checkBirthdays(): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    console.log('Today:', today);
    this.employees.forEach(employee => {
      console.log('Employee date of birth:', employee.dateOfBirth); 
  
      const employeeDob = new Date(employee.dateOfBirth);
      employeeDob.setHours(0, 0, 0, 0);
  
      if (employeeDob.getTime() === today.getTime()) { 
        const fullName = employee.firstName+" "+employee.lastName;
        this.showBirthdayNotification(fullName);
      }
    });
  }
  

  showBirthdayNotification(name: string): void {
    this._snackBar.open(`Today is ${name}'s birthday! 🎉`, 'Close', {
      duration: 8000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['birthday-notification']
    });
  }

}