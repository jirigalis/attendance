import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import { Member } from '../../core/models';
import { Event } from '../../core/models/event';
import { MemberService } from '../../core/services';
import { EventService } from '../../core/services/event.service';
import { AddMembersToEventDialogComponent } from '../add-members-to-event-dialog/add-members-to-event-dialog.component';

@Component({
    selector: 'app-event-detail',
    templateUrl: './event-detail.component.html',
    styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {
    event: Event;
    members: Member[];
    eventMembersDataSource: MatTableDataSource<any>;
    participantsLoading = false;

    constructor(
        private route: ActivatedRoute,
        private eventService: EventService,
        private memberService: MemberService,
        private authService: AuthenticationService,
        private dialog: MatDialog,
        private location: Location,
    ) { }

    ngOnInit() {
        const eventId = this.route.snapshot.paramMap.get('eventId');
        this.eventService.getById(eventId).subscribe((event: Event) => {
            this.event = event;
        })

        this.memberService.listNames(this.authService.getSchoolyear()).subscribe((members) => {
            this.members = members;
        });
    }

    goBack() {
        this.location.back();
    }

    public addMembersToEvent() {
        const dialogRef = this.dialog.open(AddMembersToEventDialogComponent);
        dialogRef.afterClosed().subscribe(res => {
            console.log(this.event)
            if (res) {
                this.eventService.addMembersToSchoolyear({ eventId: this.event.id, members: res})
                    .subscribe(() => {
                        this.refreshMembers();
                    })
            }
        });
    }

    private refreshMembers() {
        this.eventService.getById(this.event.id).subscribe((event: any) => {
            this.event = event;
            this.eventMembersDataSource.data = event;
        })
    }

}
