import { Component } from '@angular/core';
import {  RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/employee/header/header.component";
import { EmployeeListComponent } from "./components/employee/employee-list/employee-list.component";
import { CommonModule } from '@angular/common';

import { FooterComponent } from "./components/employee/footer/footer.component";
import { BirthdayReminderComponent } from "./components/employee/birthday-reminder/birthday-reminder.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, HeaderComponent, EmployeeListComponent, CommonModule, FooterComponent, BirthdayReminderComponent]
})
export class AppComponent {

  constructor() {}

  
  
}
