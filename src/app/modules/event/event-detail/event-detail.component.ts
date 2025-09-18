import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import { Member } from '../../core/models';
import { Event } from '../../core/models/event';
import { MemberService } from '../../core/services';
import { EventService } from '../../core/services/event.service';
import { BasicDialogComponent } from '../../shared/dialog/basic-dialog/basic-dialog.component';
import { KpiCardComponent, KpiCardSettings } from '../../shared/kpi-card/kpi-card.component';
import { AddMembersToEventDialogComponent } from '../add-members-to-event-dialog/add-members-to-event-dialog.component';
import { FlexLayoutModule } from "@ngbracket/ngx-layout";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatButtonModule } from "@angular/material/button";

@Component({
    selector: 'app-event-detail',
    templateUrl: './event-detail.component.html',
    imports: [
        FlexLayoutModule,
        MatProgressBarModule,
        MatCardModule,
        MatTableModule,
        MatIconModule,
        RouterModule,
        MatTooltipModule,
        MatSortModule,
        MatButtonModule,
        KpiCardComponent,
    ],
    styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {
    @ViewChild(MatSort) sort: MatSort;
    displayedColumns: string[] = ['name', 'role', 'actions'];
    event: Event;
    members: Member[];
    filteredMembers
    eventMembersDataSource: MatTableDataSource<any>;
    participantsLoading = true;
    eventChildKpi: KpiCardSettings;
    eventAdultKpi: KpiCardSettings;
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
            this.eventMembersDataSource.sort = this.sort;
            this.event = results[0];
            this.participantsLoading = false;
            this.members = results[1];
            this.eventChildKpi = {
                label: 'Počet dětí',
                value: this.event.members.filter(m => m.role === 'D').length,
                icon: 'group'
            };
            this.eventAdultKpi = {
                label: 'Počet vedoucích',
                value: this.event.members.filter(m => m.role === 'V').length,
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
            this.eventMembersDataSource.sort = this.sort;
        })
    }

}
