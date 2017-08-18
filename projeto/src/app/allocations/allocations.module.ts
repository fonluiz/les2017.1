﻿import { NgModule } from '@angular/core';
import { CommonModule }       from '@angular/common';
import { FormsModule }        from '@angular/forms';
import { FlashMessagesModule} from 'angular2-flash-messages';

import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import 'hammerjs';

import { AppRoutingModule } from '../app-routing.module';

import {AddAllocationComponent} from './add-allocation/add-allocation.component';
import {AllocationTableComponent} from './allocation-table/allocation-table.component';
import {EditAllocationComponent} from './edit-allocation/edit-allocation.component';
import { AlertsComponent } from './alerts/alerts.component';
import { ClassesContainerComponent } from './classes-container/classes-container.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FlashMessagesModule],
    declarations: [
        AddAllocationComponent,
        AllocationTableComponent,
        EditAllocationComponent,
        AlertsComponent,
        ClassesContainerComponent],
    exports: []
})

export class AllocationsModule {}