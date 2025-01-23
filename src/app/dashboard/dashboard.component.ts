import { Component } from '@angular/core';
import { DataComponent } from './data/data.component';
import { AddDataComponent } from './add-data/add-data.component';
import { ButtonComponent } from './button/button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DataComponent, AddDataComponent, ButtonComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent{
  
  public showForm = true;

  buttonClicked() {
    this.showForm = !this.showForm;
  }
}
