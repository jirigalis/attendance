import { Location } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, ViewChild } from '@angular/core';
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
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { SnackService } from "../../core/services/snack.service";

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
    destroyRef = inject(DestroyRef);

    @ViewChild(MatSort) sort: MatSort;
    displayedColumns: string[] = ['name', 'role', 'participated', 'actions'];
    event: Event;
    eventId: number;
    private members: Member[];
    eventMembersDataSource: MatTableDataSource<any>;
    participantsLoading = true;
    eventKpis: KpiCardSettings[] = [];

    constructor(
        private route: ActivatedRoute,
        private eventService: EventService,
        private memberService: MemberService,
        private authService: AuthenticationService,
        private dialog: MatDialog,
        private location: Location,
        private snack: SnackService,
    ) { }

    ngOnInit() {
        this.eventId = Number(this.route.snapshot.paramMap.get('eventId'));
        this.loadData();
    }

    private loadData() {
        const event$ = this.eventService.getById(this.eventId);
        const members$ = this.memberService.listNames(this.authService.getSchoolyear());

        forkJoin([event$, members$]).subscribe(results => {
            this.eventMembersDataSource = new MatTableDataSource(results[0].members);
            this.eventMembersDataSource.sort = this.sort;
            this.event = results[0];
            this.members = results[1];

            this.participantsLoading = false;

            const membersParticipated = this.event.members.filter(m => m.pivot.participated === 1).length;
            const totalAttendance = Math.round((membersParticipated / this.members.length) * 100);
            this.eventKpis = [
                {
                    label: 'Počet registrovaných',
                    value: this.event.members.length,
                    icon: 'percent'
                },
                {
                    label: 'Počet zúčastěných',
                    value: this.event.members.filter(m => m.pivot.participated === 1).length,
                    icon: 'group'
                },
                {
                    label: 'Účast v procentech',
                    value: totalAttendance > 100 ? '100 %' : totalAttendance + ' %',
                    icon: 'percent'
                },
            ];
        })
    }

    goBack() {
        this.location.back();
    }

    public addMembersToEvent() {
        const dialogRef = this.dialog.open(AddMembersToEventDialogComponent, {
            data: {
                selectedMembers: [...this.event.members],
                allMembers: [...this.members],
        },
            width: '700px',
        });
        dialogRef.afterClosed().subscribe(res => {
            if (res) {
                const originalMemberIds = this.event.members.map(m => m.id);
                const newMemberIds = res.map(m => m.id);
                const selectedMemberIds = newMemberIds.filter(id => !originalMemberIds.includes(id));

                if (selectedMemberIds.length !== 0) {
                    this.eventService.addMembersToEvent({ eventId: this.event.id, members: selectedMemberIds })
                        .subscribe(() => {
                            this.refreshMembers();
                            this.loadData();
                        });
                }
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
                        this.loadData();
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

    private markParticipation(memberId: number, participated: boolean) {
        this.eventService.markParticipation(this.event.id, memberId, participated)
            .pipe(
                takeUntilDestroyed(this.destroyRef),
            )
            .subscribe(() => {
                this.refreshMembers();
                this.loadData();
            })
    }

    public markAsNotParticipated(memberId: number) {
        this.markParticipation(memberId, false);
    }

    public markAsParticipated(memberId: number) {
        this.markParticipation(memberId, true);
    }

    public openRegistration() {
        this.eventService.openRegistration(this.event.id)
            .pipe(
                takeUntilDestroyed(this.destroyRef),
            )
            .subscribe(() => {
                this.snack.open('Registrace byla úspěšně oteřena.');
                this.event.openRegistration = 1;
            })
    }

    public closeRegistration() {
        this.eventService.closeRegistration(this.event.id)
            .pipe(
                takeUntilDestroyed(this.destroyRef),
            )
            .subscribe(() => {
                this.snack.open('Registrace byla úspěšně zavřena.');
                this.event.openRegistration = 0;
            })
    }

    protected readonly close = close;
}
