import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from '../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, SharedModule, MatMenuModule, MatToolbarModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  public title: string = 'Stay Active, Stay Together';
  public imagePath: string = "./../assets/images/sport.jpeg";
}
