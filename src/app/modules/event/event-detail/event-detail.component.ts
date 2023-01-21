import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import { Member } from '../../core/models';
import { Event } from '../../core/models/event';
import { MemberService } from '../../core/services';
import { EventService } from '../../core/services/event.service';
import { BasicDialogComponent } from '../../shared/dialog/basic-dialog/basic-dialog.component';
import { KpiCardSettings } from '../../shared/kpi-card/kpi-card.component';
import { AddMembersToEventDialogComponent } from '../add-members-to-event-dialog/add-members-to-event-dialog.component';

@Component({
    selector: 'app-event-detail',
    templateUrl: './event-detail.component.html',
    styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {
    displayedColumns: string[] = ['id', 'name', 'actions'];
    event: Event;
    members: Member[];
    filteredMembers
    eventMembersDataSource: MatTableDataSource<any>;
    participantsLoading = true;
    eventKpi: KpiCardSettings;
    eventPercentageKpi: KpiCardSettings;

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
        const event$ = this.eventService.getById(eventId);
        const members$ = this.memberService.listNames(this.authService.getSchoolyear());

        forkJoin([event$, members$]).subscribe(results => {
            this.eventMembersDataSource = new MatTableDataSource(results[0].members);
            this.event = results[0];
            this.participantsLoading = false;
            this.members = results[1];
            this.eventKpi = {
                label: 'Počet účastníků',
                value: this.event.members.length,
                icon: 'group'
            };
            this.eventPercentageKpi = {
                label: 'Účast v procentech',
                value: Math.floor((this.event.members.length / this.members.length) * 100) + ' %',
                icon: 'percent'
            }
        })

        this.memberService.listNames(this.authService.getSchoolyear()).subscribe((members) => {
            this.members = members;
        });
    }

    goBack() {
        this.location.back();
    }

    public addMembersToEvent() {
        const dialogRef = this.dialog.open(AddMembersToEventDialogComponent, { data: this.event.members.map(m => m.id) });
        dialogRef.afterClosed().subscribe(res => {
            // this.members = this.members.filter(m => this.event.members.includ)

            if (res) {
                this.eventService.addMembersToEvent({ eventId: this.event.id, members: res})
                    .subscribe(() => {
                        this.refreshMembers();
                    })
            }
        });
    }

    public removeMember(memberId) {
        const dialogRef = this.dialog.open(BasicDialogComponent);
        dialogRef.afterClosed().subscribe(res => {
            if (res) {
                this.eventService.removeMember(this.event.id, memberId)
                    .subscribe(() => {
                        this.refreshMembers();
                    })
            }
        })
    }

    private refreshMembers() {
        this.eventService.getById(this.event.id).subscribe((event: any) => {
            this.event = event;
            this.eventMembersDataSource.data = event.members;
        })
    }

}
