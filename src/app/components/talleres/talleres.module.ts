import { ProgramasComponent } from './../programas/programas.component';
import { TalleresComponent } from './talleres.component';
import { TalleresRoutingModule } from './talleres-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPopoverModule, NgbDatepickerModule, NgbCollapseModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    TalleresComponent
  ],
  imports: [
    TalleresRoutingModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPopoverModule,
    NgbDatepickerModule,
    NgbCollapseModule,
    NgbModalModule
  ],
  providers: [
    ProgramasComponent
  ]
})
export class TalleresModule { }
