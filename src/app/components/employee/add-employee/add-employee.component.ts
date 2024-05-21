import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AbstractControl, FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { Position } from '../../../models/position.model';
import { EmployeeService } from '../../../services/employee/employee.service';
import { PositionService } from '../../../services/positions/position.service';
import { AddPositionComponent } from '../add-position/add-position.component';
@Component({
  selector: 'app-add-employee',
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
    MatInputModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatCardModule,
    MatDividerModule

  ],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss'
})
export class AddEmployeeComponent {
  employeeForm!: FormGroup;
  positionsList: Position[] = [];
  newPositionName:string = 'other';

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddEmployeeComponent>,
    private employeeService: EmployeeService,
    private positionService: PositionService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,

  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loadPositions();
  }

  initializeForm(): void {
    this.employeeForm = this.fb.group({
      idNumber: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      employmentStartDate: ['', Validators.required],
      positionsList: this.fb.array([], Validators.required)
    });
  }



  get positionsFormArray(): FormArray {
    return this.employeeForm.get('positionsList') as FormArray;
  }

  loadPositions(): void {
    this.positionService.getAllPositions().subscribe(positions => {
      this.positionsList = positions;
      console.log(this.positionsList);

      this.addPositionControl();
    });
  }

  addPositionControl(): void {
    this.positionsFormArray.push(this.fb.group({
      positionId: ['', Validators.required],
      isManagement: [false],
      entryDate: ['', [Validators.required, this.entryDateValidator()]]
    }));
  }

  entryDateValidator() {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const entryDate = new Date(control.value);
      const startOfWorkDate = new Date(this.employeeForm.get('employmentStartDate').value);
      return entryDate >= startOfWorkDate ? null : { 'entryDateInvalid': true };
    };
  }

  closeForm() {
    this.dialog.closeAll();
  }
  removePositionControl(index: number): void {
    this.positionsFormArray.removeAt(index);
  }

  isPositionDisabled(positionId: number, index: number): boolean {
    const selectedPositions = this.employeeForm.value.positionsList.map((pos: any) => pos.positionId);
    return selectedPositions.includes(positionId) && selectedPositions.indexOf(positionId) !== index;
  }
  sortedPositions(): any[] {
    return this.positionsList.sort((a, b) => {
      // אם a קטן מ b, החזר -1, אם הם שווים, החזר 0, אחרת החזר 1
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
  }

  submit(): void {
    if (this.employeeForm.valid) {
      const formData = this.employeeForm.value;
      this.employeeService.addEmployee(formData).subscribe(
        () => {
          this.openSnackBar();
          this.dialogRef.close(true);
        },
        error => {
          console.error('Error adding employee:', error);
          // Check if the error response contains validation errors from the server
          if (error.error.errors) {
            const errorMessage = 'Server validation errors: ' + Object.values(error.error.errors).join(', ');
            this.openErrorSnackBar(errorMessage);
          } else {
            this.openErrorSnackBar('An error occurred while adding employee.');
          }
        }
      );
    } else {
      this.employeeForm.markAllAsTouched();
      console.error('Form is not valid');
      this.openErrorSnackBar('Form is not valid. Please fill all required fields.');
    }
  }

  openErrorSnackBar(message: string): void {
    this._snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }


  cancel(): void {
    this.dialogRef.close(true);
  }

  openSnackBar() {
    const snackBarRef = this._snackBar.open('Employee added successfully', undefined, {
      duration: 2000,
      panelClass: ['custom-snackbar']
    });
    snackBarRef.afterDismissed().subscribe(() => {
    });
  }


  openAddPositionDialog(): void {
    const dialogRef = this.dialog.open(AddPositionComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadPositions();
        console.log(this.positionsList);

      }
    });
  }







}
