import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from '../../../services/employee/employee.service';
import { Employee } from '../../../models/employee.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeDetailsComponent } from '../employee-details/employee-details.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
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
import { DeleteEmployeeComponent } from '../delete-employee/delete-employee.component';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  standalone: true,
  imports:[

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





















    
  ]
})
export class EmployeeListComponent implements AfterViewInit {



  employees: Employee[] = [];
  displayedColumns: string[] = ['idNumber', 'firstName', 'lastName', 'startOfWorkDate', 'actions'];
  dataSource!: MatTableDataSource<Employee>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private employeeService: EmployeeService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngAfterViewInit() {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.getAllEmployees().subscribe({
      next: (res: Employee[]) => {
        this.employees = res;
        this.dataSource = new MatTableDataSource(this.employees);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openDeleteConfirmation(employee: Employee): void {
    const dialogRef = this.dialog.open(DeleteEmployeeComponent, {
      data: { employee }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getEmployees();
      }
    });
  }

  editEmployee(employee: Employee): void {
    const dialogRef = this.dialog.open(EditEmployeeComponent, {
      data: { employee }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getEmployees(); // Refresh the employee list after editing
      }
    });
  }


  viewEmployeeDetails(employee: Employee): void {
    const dialogRef = this.dialog.open(EmployeeDetailsComponent, {
      data: { employee },
      width:'500px'
    });  
    
  }
  addEmployee() {
    const dialogRef = this.dialog.open(AddEmployeeComponent, {
      width:'500px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getEmployees();
      }
    });
  }
}
