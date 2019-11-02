import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgModule } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  imports: [
    MatToolbarModule,
    MatSlideToggleModule,
    MatGridListModule
  ],
  exports: [
    MatToolbarModule,
    MatSlideToggleModule,
    MatGridListModule
  ]
})

export class MaterialModule { }
