import { Component, OnInit } from '@angular/core';
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
    membersLoading = false;
    bestAttendanceLoading = false;
    averageAttendanceLoading = false;
    membersCountOptions: any;
    membersAgeOptions: any;
    averageAttendanceOptions: any;
    soonestBirthday: any;
    membersByAttendance;
    attendanceKpi: KpiCardSettings;
    registeredMembersKpi: KpiCardSettings;
    averageAttendanceKpi: KpiCardSettings;
    attendanceStats;

    ngOnInit() {
        moment.locale('cs');
        this.membersLoading = true;
        this.bestAttendanceLoading = true;
        this.averageAttendanceLoading = true;
        const schoolyearId = this.authService.getSchoolyear();

        this.attendanceKpi = {
            label: 'Počet schůzek v tomto roce',
            value: '',
            icon: 'event'
        }

        this.registeredMembersKpi = {
            label: 'Počet členů v tomto roce',
            value: '',
            icon: 'supervisor_account'
        }

        this.averageAttendanceKpi = {
            label: 'Průměrná docházka',
            value: '',
        }

        this.memberService.getAll().subscribe((data: Member[]) => {
            this.membersCountOptions = {
                title: {
                    text: 'Celkový počet: ' + data.length,
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
                        data: this._getMembersCountData(data),
                    },
                ],
                animationEasing: 'elasticOut',
                animationDelayUpdate: (idx) => idx * 5,
            };

            //////////

            this.membersAgeOptions = {
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} osob',
                },
                calculable: true,
                series: [
                    {
                        name: 'Věk',
                        type: 'pie',
                        radius: [30, 110],
                        roseType: 'area',
                        data: this._getMembersAgeData(data),
                    },
                ],
            };

            this.soonestBirthday = this._getSoonestBirthday(data);
            this.membersLoading = false;
        });

        this.attendanceService
            .getMembersByAttendanceCount()
            .subscribe((members) => {
                this.membersByAttendance = members;
                this.bestAttendanceLoading = false;
            });

        const meetingCount$ = this.attendanceService.getAllDatesBySchoolyear(schoolyearId);
        const averageAttendance$ = this.attendanceService.getAverageAttendanceForSchoolyear(schoolyearId);
        const membersBySchoolyear$ = this.memberService.getAllBySchoolyear(schoolyearId);

        forkJoin([meetingCount$, averageAttendance$, membersBySchoolyear$]).subscribe(results => {
            this.attendanceKpi.value = results[0].length;
            this.attendanceStats = results[1];
            this.registeredMembersKpi.value = results[2].length;

            const attendanceCount = this.attendanceStats.reduce((prev, current) => {
                return prev + current.dateCount;
            }, 0)

            this.averageAttendanceKpi.value = Math.floor((attendanceCount / (this.registeredMembersKpi.value * this.attendanceKpi.value)) * 100) + ' %';
            this.averageAttendanceOptions = this._getAverageAttendanceData(this.attendanceStats, this.registeredMembersKpi.value);
            this.averageAttendanceLoading = false;
        })
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
        return memberAgeData;
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
        const dataPercentage = data.map(item => Math.floor((item.dateCount / membersCount) * 100));

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
}
