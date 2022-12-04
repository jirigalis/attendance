import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { AddMembersToEventDialogComponent } from './add-members-to-event-dialog/add-members-to-event-dialog.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventDialogComponent } from './event-dialog/event-dialog.component';
import { EventsComponent } from './events/events.component';

@NgModule({
	imports: [
		CommonModule,
		FlexLayoutModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule,
		MaterialModule,
		SharedModule,
	],
	declarations: [
		EventsComponent,
		EventDialogComponent,
		EventDetailComponent,
		AddMembersToEventDialogComponent,
	],
	exports: [
		EventsComponent,
		EventDetailComponent,
	]
})
export class EventModule { }
