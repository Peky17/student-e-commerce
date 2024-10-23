import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TaskRoutingModule } from './task-routing.module';
import { MainTaskComponent } from './pages/main-task/main-task.component';
import { DeleteModalComponent } from './pages/main-task/modals/delete-modal/delete-modal.component';
import { UpdateModalComponent } from './pages/main-task/modals/update-modal/update-modal.component';
import { AddModalComponent } from './pages/main-task/modals/add-modal/add-modal.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    MainTaskComponent,
    DeleteModalComponent,
    UpdateModalComponent,
    AddModalComponent,
  ],
  imports: [CommonModule, TaskRoutingModule, ReactiveFormsModule, SharedModule],
  exports: [MainTaskComponent, DeleteModalComponent, UpdateModalComponent],
})
export class TaskModule {}
