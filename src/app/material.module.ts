import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    MatToolbarModule,
    MatSlideToggleModule
  ],
  exports: [
    MatToolbarModule,
    MatSlideToggleModule
  ]
})

export class MaterialModule { }
