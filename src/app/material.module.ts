import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    MatToolbarModule,
    MatSlideToggleModule,
    MatButtonModule
  ],
  exports: [
    MatToolbarModule,
    MatSlideToggleModule,
    MatButtonModule
  ]
})

export class MaterialModule { }
