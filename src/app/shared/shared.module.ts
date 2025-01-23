import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatPaginatorModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    MatPaginatorModule
  ]
})
export class SharedModule { }
