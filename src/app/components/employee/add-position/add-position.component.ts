import { Component } from '@angular/core';
import { PositionService } from '../../../services/positions/position.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
  selector: 'app-add-position',
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
  templateUrl: './add-position.component.html',
  styleUrl: './add-position.component.scss'
})
export class AddPositionComponent {




  constructor(
    private _positionService: PositionService,
    private dialogRef: MatDialogRef<AddPositionComponent>,
    private _snackBar: MatSnackBar,
  ) {
  }
 
  positionForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  submit(): void {
    if (this.positionForm.valid) {
      this._positionService.addPosition(this.positionForm.value).subscribe(res => {
        this._snackBar.open('Position added successfully', 'Close', { duration: 3000 });
        this.dialogRef.close(true);
      });
    } else {
      this._snackBar.open('Please fill all required fields', 'Close', { duration: 3000 });
    }
    }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
