import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { forkJoin } from 'rxjs';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import { Member } from '../../core/models';
import { AttendanceService } from '../../core/services/attendance.service';
import { KpiCardSettings } from '../../shared/kpi-card/kpi-card.component';
import { MemberService } from './../../core/services/member.service';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

    constructor(
        private memberService: MemberService,
        private attendanceService: AttendanceService,
        private authService: AuthenticationService,
    ) { }

    @ViewChild(MatSort) sort: MatSort;
    membersLoading = false;
    averageAttendanceLoading = false;
    membersCountOptions: any;
    membersAgeOptions: any;
    averageAttendanceOptions: any;
    membersByAttendance;
    attendanceKpi: KpiCardSettings;
    registeredMembersKpi: KpiCardSettings;
    averageAttendanceKpi: KpiCardSettings;
    birthdayKpi: KpiCardSettings = {
        label: 'Nejbližší narozeniny',
        value: '',
        icon: 'cake'
    }
    attendanceStats;
    newAttendaceStats;
    schoolyearMeetings;
    membersDatasource: MatTableDataSource<Member>;
    membersColumns = ['name', 'role', 'age', 'attendancePercentage'];

    ngOnInit() {
        moment.locale('cs');
        this.membersLoading = true;
        this.averageAttendanceLoading = true;
        const schoolyearId = this.authService.getSchoolyear();

        this.attendanceKpi = {
            label: 'Schůzek v tomto roce',
            value: '',
            icon: 'event'
        }

        this.registeredMembersKpi = {
            label: 'Dětí v tomto roce',
            value: '',
            icon: 'supervisor_account'
        }

        this.averageAttendanceKpi = {
            label: 'Průměrná docházka',
            value: '',
        }

        const meetingCount$ = this.attendanceService.getAllDatesBySchoolyear(schoolyearId);
        const averageAttendance$ = this.attendanceService.getAverageAttendanceForSchoolyear(schoolyearId);
        const membersBySchoolyear$ = this.memberService.getAllBySchoolyear(schoolyearId);
        const membersByAttendance$ = this.attendanceService.getMembersByAttendanceCount(schoolyearId);

        forkJoin([meetingCount$, averageAttendance$, membersBySchoolyear$, membersByAttendance$]).subscribe(results => {
            this.schoolyearMeetings = results[0];
            this.attendanceKpi.value = results[0].length;
            this.attendanceStats = results[1];
            this.registeredMembersKpi.value = results[2].filter(m => m.role === 'D').length;

            this.membersByAttendance = results[3];

            this.membersCountOptions = {
                title: {
                    text: 'Celkový počet: ' + results[2].length,
                    left: 'center',
                },
                tooltip: {
                    trigger: 'item',
                },
                legend: {
                    data: ['Dívky', 'Chlapci', 'Vedoucí'],
                    orient: 'vertical',
                    left: 'left',
                },
                series: [
                    {
                        name: 'Členové',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: true,
                        itemStyle: {
                            borderRadius: 10,
                            borderColor: '#fff',
                            borderWidth: 2,
                        },
                        label: {
                            show: false,
                            position: 'center',
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '30',
                                fontWeight: 'bold',
                            },
                        },
                        data: this._getMembersCountData(results[2]),
                    },
                ],
                animationEasing: 'elasticOut',
                animationDelayUpdate: (idx) => idx * 5,
            };

            this.membersAgeOptions = {
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} osob',
                },
                xAxis: [
                    {
                        type: 'category',
                        data: this._getMembersAgeData(results[2]).map((val) => val.name).sort((a, b) => a - b).map((val) => val + ' let'),
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis: [{
                    type: 'value'
                }],
                series: [
                    {
                        name: 'Věk',
                        type: 'bar',
                        data: this._getMembersAgeData(results[2]),
                    },
                ],
            }

            //// Members table
            results[2].forEach((m: Member) => {
                m.attendance = this._getMemberAttendanceStats(m);
            });
            this.newAttendaceStats = results[2];
            
            this.membersDatasource = new MatTableDataSource(this.newAttendaceStats);
            this.membersDatasource.sortingDataAccessor = (item, property) => {
                switch (property) {
                    case 'attendancePercentage': return item.attendance.percentage;
                    case 'age': return item.getAge();
                    default: return item[property];
                }
            };
            this.membersDatasource.sort = this.sort;

            this.averageAttendanceKpi.value = this._calculateAverageAttendance() + ' %';
            this.averageAttendanceOptions = this._getAverageAttendanceData(this.attendanceStats, results[2].length);
            this.averageAttendanceLoading = false;

            const bd = this._getSoonestBirthday(results[2]);
            this.birthdayKpi.value = bd.getFullName();
            this.birthdayKpi.label = bd.getNearestBirthday();
            this.membersLoading = false;
        })
    }

    public getColorClass(value: number) {
        if (value < 20) {
            return 'red';
        } else if (value < 40) {
            return 'orange';
        } else if (value < 60) {
            return 'yellow';
        } else if (value < 80) {
            return 'lime';
        }else {
            return 'green';
        }
    }

    private _getSoonestBirthday(members: Member[]) {
        let soonestBirthday = moment(members[0].getBirthday(), 'DD. MM.');
        let wantedMember: Member = members[0];

        if (soonestBirthday.isBefore(moment())) {
            soonestBirthday = soonestBirthday.add(1, 'y');
        }

        members.forEach((m: Member) => {
            let birthday = moment(m.getBirthday(), 'DD. MM.');
            if (m.hadBirthdayThisYear()) {
                birthday = birthday.add(1, 'y');
            }

            if (birthday.isBefore(soonestBirthday)) {
                soonestBirthday = birthday;
                wantedMember = m;
            }
        });
        return wantedMember;
    }

    private _getMembersAgeData(data) {
        let memberAgeData = [];

        data.forEach((val) => {
            if (val.role == 'D') {
                let newValue = {
                    name: MemberService.getAgeFromRC(val.rc),
                    value: 1,
                };

                let index = memberAgeData.findIndex(
                    (find) => MemberService.getAgeFromRC(val.rc) == find.name
                );
                if (index < 0) {
                    memberAgeData.push(newValue);
                } else {
                    memberAgeData[index].value++;
                }
            }
        });
        return memberAgeData.sort((a, b) => a.name - b.name);
    }

    private _getMembersCountData(data) {
        let membersCountData = [
            {
                name: 'Dívky',
                value: [
                    data.filter(
                        (val) =>
                            MemberService.isWomanFromRC(val.rc) &&
                            val.role != 'V'
                    ).length,
                ],
                animationDelay: (idx) => idx * 10,
            },
            {
                name: 'Chlapci',
                value: [
                    data.filter(
                        (val) =>
                            !MemberService.isWomanFromRC(val.rc) &&
                            val.role != 'V'
                    ).length,
                ],
            },
            {
                name: 'Vedoucí',
                value: [data.filter((val) => val.role == 'V').length],
            },
        ];

        return membersCountData;
    }

    private _getAverageAttendanceData(data, membersCount) {
        const xAxisData = data.map(item => moment(item.date).format('D. M. YYYY'));
        const data1 = data.map(item => item.dateCount);
        
        // get maximum members count for each day
        const dataPercentage = data.map(item => {
            const allMembersCount = this.newAttendaceStats.filter(m => m.paid <= item.date).length;
            return Math.floor((item.dateCount / allMembersCount) * 100);
        });
        
        const options = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#999',
                    },
                }
            },
            xAxis: {
                data: xAxisData,
                silent: false,
                splitLine: {
                    show: false,
                },
            },
            yAxis: [
                {
                    min: 0,
                    max: membersCount
                },
                {
                    min: 0,
                    max: 100,
                    interval: 20,
                    axisLabel: {
                        formatter: '{value} %'
                    }
                }
            ],
            series: [
                {
                    name: 'Počet lidí na schůzce',
                    type: 'bar',
                    data: data1,
                    tooltip: {
                        valueFomratter: val => val + ' lidí'
                    },
                    animationDelay: (idx) => idx * 10,
                },
                {
                    name: 'Procenta',
                    type: 'line',
                    yAxisIndex: 1,
                    data: dataPercentage,
                    tooltip: {
                        valueFomratter: val => val + ' %'
                    }
                }
            ],
            animationEasing: 'elasticOut',
            animationDelayUpdate: (idx) => idx * 5,
        };

        return options
    }

    private _getMemberAttendanceStats(member: Member) {
        const allMeetingsCount = this.schoolyearMeetings.length;
        const paidMeetingsCount = this.schoolyearMeetings.filter(m => m.date >= member.paid).length;
        const meetingsAttended = this.membersByAttendance.find((mba) => mba.id === member.id)?.attendance_count || 0;

        const meetingsCount = meetingsAttended > paidMeetingsCount ? allMeetingsCount : paidMeetingsCount;

        return {
            meetingsCount : meetingsCount || 0,
            meetingsAttended: meetingsAttended || 0,
            percentage : Math.floor((meetingsAttended / meetingsCount) * 100)
        }
    }

    private _calculateAverageAttendance() {
        const percentageSum = this.newAttendaceStats.reduce((prev: number, current) => {
            return prev + Number(current.attendance.percentage);
        }, 0)
        return Math.floor(percentageSum / this.newAttendaceStats.length);
    }
}