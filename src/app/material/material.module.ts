import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';



const material = [
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatCheckboxModule,
  MatTableModule,
  MatSelectModule
];


@NgModule({
  exports: [material],
  imports: [material]
})
export class MaterialModule { }
