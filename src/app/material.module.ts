import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    MatToolbarModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatInputModule
  ],
  exports: [
    MatToolbarModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatInputModule
  ]
})

export class MaterialModule { }
