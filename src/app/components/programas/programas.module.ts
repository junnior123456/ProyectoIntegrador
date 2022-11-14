import { ProgramasRoutingModule } from './programas-routing.module';
import { ProgramasComponent } from './programas.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPopoverModule, NgbDatepickerModule, NgbCollapseModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    ProgramasComponent
  ],
  imports: [
    ProgramasRoutingModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPopoverModule,
    NgbDatepickerModule,
    NgbCollapseModule,
    NgbModalModule
  ],

})
export class ProgramasModule { }
