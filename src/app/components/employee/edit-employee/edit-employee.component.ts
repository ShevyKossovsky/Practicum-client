
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { EmployeeService } from '../../../services/employee/employee.service';
import { Employee } from '../../../models/employee.model';
import { Position } from '../../../models/position.model';
import { PositionService } from '../../../services/positions/position.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
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
import { AddPositionComponent } from '../add-position/add-position.component';
@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss'],
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

})
export class EditEmployeeComponent {
  employeeForm: FormGroup;
  positions: Position[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { employee: Employee },
    private employeeService: EmployeeService,
    private _snackBar: MatSnackBar,
    private positionService: PositionService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loadPositions();
    this.setEmployeeData();
  }

  initializeForm(): void {
    this.employeeForm = this.fb.group({
      id: [this.data.employee.id],
      idNumber: [this.data.employee.idNumber, [Validators.required, Validators.pattern(/^\d{9}$/)]],
      firstName: [this.data.employee.firstName, Validators.required],
      lastName: [this.data.employee.lastName, Validators.required],
      gender: [this.data.employee.gender, Validators.required],
      dateOfBirth: [this.data.employee.dateOfBirth, Validators.required],
      employmentStartDate: [this.data.employee.employmentStartDate, Validators.required],
      positionsList: this.fb.array([], Validators.required)
    });

    this.data.employee.positionsList.forEach(position => {
      this.addPositionControl(position);
    });
  }

  setEmployeeData(): void {
    const employeeData = this.data.employee;
    this.employeeForm.setControl('positionsList', this.fb.array([]));
    employeeData.positionsList.forEach(position => {
      this.addPositionControl(position);
    });
  }
  closeForm() {
    this.dialog.closeAll();
  }

  get positionsFormArray(): FormArray {
    return this.employeeForm.get('positionsList') as FormArray;
  }

  loadPositions(): void {
    this.positionService.getAllPositions().subscribe(positions => {
      this.positions = positions;
    });
  }

  addPositionControl(position?: any): void {
    console.log("add position");

    const positionGroup = this.fb.group({
      positionId: [position ? position.position.id : '', Validators.required],
      isManagement: [position ? position.isManagement : false, Validators.required],
      entryDate: [position ? position.entryDate : '', [Validators.required, this.entryDateValidator()]]
    });
    this.positionsFormArray.push(positionGroup);
  }

  removePositionControl(index: number): void {
    this.positionsFormArray.removeAt(index);
  }
  isPositionDisabled(positionId: number, index: number): boolean {
    const selectedPositions = this.employeeForm.value.positionsList.map((pos: any) => pos.positionId);
    return selectedPositions.includes(positionId) && selectedPositions.indexOf(positionId) !== index;
  }

  entryDateValidator() {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const entryDate = new Date(control.value);
      const startOfWorkDate = new Date(this.employeeForm.get('employmentStartDate').value);
      return entryDate >= startOfWorkDate ? null : { 'entryDateInvalid': true };
    };
  }
  sortedPositions(): any[] {
    return this.positions.sort((a, b) => {
      // אם a קטן מ b, החזר -1, אם הם שווים, החזר 0, אחרת החזר 1
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
  }

  submit(): void {

    console.log("submit is called");
    if (this.employeeForm.valid) {
      const formData = this.employeeForm.value;
      console.log(formData);
      
      this.employeeService.updateEmployee(formData.id, formData).subscribe(
        (res) => {
          console.log(res);
          this.openSnackBar('Employee edited successfully');
          this.dialogRef.close(true);

        },
        error => {
          console.error('Error editing employee:', error);
          if (error.error.errors) {
            const errorMessage = 'Server validation errors: ' + Object.values(error.error.errors).join(', ');
            this.openErrorSnackBar(errorMessage);
          } else {
            this.openErrorSnackBar('An error occurred while editing employee.');
          }
        }
      );
    } else {
      console.error('Form is not valid');
      this.openErrorSnackBar('Form is not valid. Please fill all required fields.');
    }
  }

  openSnackBar(message: string): void {
    this._snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
  openErrorSnackBar(message: string): void {
    this._snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }



  openAddPositionDialog() {
    const dialogRef = this.dialog.open(AddPositionComponent, {
      width: '300px'
    });


    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadPositions();
      }
    });

  }
}
