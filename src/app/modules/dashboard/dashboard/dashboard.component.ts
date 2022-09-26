import { MemberService } from './../../core/services/member.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { AttendanceService } from '../../core/services/attendance.service';
import { Member } from '../../core/models';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    constructor(
        private memberService: MemberService,
        private attendanceService: AttendanceService
    ) {}
    membersLoading = false;
    bestAttendanceLoading = false;
    membersCountOptions: any;
    membersAgeOptions: any;
    soonestBirthday: any;
    membersByAttendance;

    ngOnInit() {
        moment.locale('cs');
        this.membersLoading = true;
        this.bestAttendanceLoading = true;

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
                    formatter: '{a} <br/>{b} : {c} osoby',
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
}
