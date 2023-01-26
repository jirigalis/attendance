import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { forkJoin } from 'rxjs';
import { AuthenticationService } from '../core/authentication/authentication.service';
import { Member } from '../core/models';
import { MemberService } from '../core/services';
import { AttendanceService } from '../core/services/attendance.service';

@Component({
    selector: 'app-export-attendance',
    templateUrl: './export-attendance.component.html',
    styleUrls: ['./export-attendance.component.scss']
})
export class ExportAttendanceComponent implements OnInit {
    public members;
    public selectedMembers = [];
    public minDate;
    public maxDate = moment();

    public exportData;
    public dataSource;
    public meetingDates = [];
    public allColumns;

    public loading = false;
    public dataLoaded = false;
    public printMe = false;
    public listConfig = {
        getLabel: (s) => s.name + ' ' + s.surname,
    }

    constructor(
        private membersService: MemberService,
        private auth: AuthenticationService,
        private snack: MatSnackBar,
        private attendanceService: AttendanceService,
    ) { }

    ngOnInit() {
        this.membersService.getAllBySchoolyear(this.auth.getSchoolyear()).subscribe(members => {
            this.members = members;
        });
    }

    public getDataForExport() {
        if (this.selectedMembers.length > 0) {
            this.loading = true;
            const memberIds = this.selectedMembers.map(m => m.id);
            const meetingDates$ = this.attendanceService.getAllDatesBySchoolyear(this.auth.getSchoolyear())
            const membersData$ = this.membersService.getAllForExport(this.auth.getSchoolyear(), memberIds);

            forkJoin([meetingDates$, membersData$]).subscribe(result => {
                // filter dates
                this.meetingDates = result[0]
                    .filter((d: any) =>  (this.minDate ? moment(d.date).isSameOrAfter(moment(this.minDate)) : true) && moment(d.date).isSameOrBefore(moment(this.maxDate)))
                    .map((d: any) => moment(d.date).format('DD. MM. YYYY'));

                this.allColumns = ['name', ...this.meetingDates];
                const tableData = [];
                result[1].forEach((m: Member) => {
                    const finalMemberValue = {
                        id: m.id,
                        name: m.name + ' ' + m.surname,
                    };

                    m.attendance = (m.attendance as Array<any>).map(val => {
                        return moment(val.date).format('DD. MM. YYYY')
                    });
                    
                    this.meetingDates.forEach((md: any) => {
                        if ((m.attendance as Array<any>).includes(md)) {
                            finalMemberValue[md] = true;
                            return;
                        }
                    })
                    tableData.push(finalMemberValue);
                })
                this.dataSource = new MatTableDataSource(tableData);
                this.loading = false;
                this.dataLoaded = true;
            })
        } else {
            this.snack.open('Musí být vybrán alespoň jeden člen.', 'X', { duration: 3000 });
        }
    }

    public printData() {
        this.printMe = true;
        setTimeout(() => {
            window.print();
            this.printMe = false;

        }, 1000)
    }

}
