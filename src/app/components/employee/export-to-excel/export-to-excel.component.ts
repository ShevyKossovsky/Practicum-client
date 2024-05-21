import { Component } from '@angular/core';
import {  OnInit, ViewEncapsulation } from '@angular/core';
import * as XLSX from 'xlsx';
import { Observable } from 'rxjs';
import { EmployeeService } from '../../../services/employee/employee.service';
import { Employee } from '../../../models/employee.model';
import { saveAs } from 'file-saver';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
@Component({
  selector: 'app-export-to-excel',
  standalone: true,
  imports: [
    CommonModule,
  
    MatIconModule,
    MatIconButton,
    MatButtonModule,
    MatTableModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule ,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatCardModule ,
    MatDividerModule 







  ],
  templateUrl: './export-to-excel.component.html',
  styleUrl: './export-to-excel.component.scss'
})
export class ExportToExcelComponent {
  constructor(private _employeeService: EmployeeService) { }

  ngOnInit(): void {
  }

  exportToExcel(): void {
    this._employeeService.getAllEmployees().subscribe((employees: Employee[]) => {
      const formattedData: any[] = [];
      employees.forEach(employee => {
        employee.positionsList.forEach(position => {
          const rowData = {
            'Employee ID': employee.id,
            'First Name': employee.firstName,
            'Surname': employee.lastName,
            'Identity Number': employee.idNumber,
            'Gender': employee.gender,
            'Date of Birth': this.formatDate(employee.dateOfBirth),
            'Beginning of Work': this.formatDate(employee.employmentStartDate),
            'Position Name': position.position.name,
            'Is Management': position.isManagement ? 'Yes' : 'No',
            'Entry Date': this.formatDate(position.entryDate)
          };
          formattedData.push(rowData);
        });
      });
  
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(formattedData);
      const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const now = new Date();
      const formattedDate = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`;
      const fileName = `employees_${formattedDate}.xlsx`;
      const excelBlob: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
      saveAs(excelBlob, fileName);
    }, error => {
      console.error(error); // Log any errors to the console
    });
  }
  
  

  private formatDate(date: Date): string {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
  
    return `${day}/${month}/${year}`;
  }
}
