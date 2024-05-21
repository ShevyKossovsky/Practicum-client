import { Component, Inject } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
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
import { MatExpansionModule, MatExpansionPanel } from '@angular/material/expansion';

import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { EmployeeService } from '../../../services/employee/employee.service';
import { Employee } from '../../../models/employee.model';
@Component({
  selector: 'app-delete-employee',
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
  templateUrl: './delete-employee.component.html',
  styleUrl: './delete-employee.component.scss'
})
export class DeleteEmployeeComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { employee: Employee },
    private _employeeService: EmployeeService,
    private _snackBar: MatSnackBar
  ) { }


  cancel(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.dialogRef.close(true)
    if (this.data.employee) {
      this._employeeService.deleteEmployee(this.data.employee.id).subscribe(
        response => {

          console.log('Employee deleted successfully:', response);
          this.openSnackBar();

        },
        error => {
          console.error('Error deleting employee:', error);
          this.dialogRef.close();
        }
      );
    }
  }

  openSnackBar() {
    const snackBarRef = this._snackBar.open('Employee deleted successfully', undefined, {
      duration: 2000,
      panelClass: ['custom-snackbar']
    });
  
  }
}
