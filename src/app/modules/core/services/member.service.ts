import { environment } from './../../../../environments/environment';
import { Member } from './../models/member';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class MemberService {
    private apiUrl = environment.API_URL + '/members';

    constructor(private http: HttpClient) {}

    getAll(): Observable<Member[]> {
        return this.http
            .get<Member[]>(this.apiUrl)
            .pipe(
                map((data) =>
                    data.map((data) => new Member().deserialize(data))
                )
            );
    }

    listNames(): Observable<Member[]> {
        return this.http
            .get<Member[]>(this.apiUrl + '/names')
            .pipe(
                map((data) =>
                    data.map((data) => new Member().deserialize(data))
                )
            );
    }

    getById(id: Number) {
        return this.http.get<Member>(this.apiUrl + '/' + id).pipe(
            map((data) => new Member().deserialize(data)),
            catchError(() => throwError('Uživatel nenalezen'))
        );
    }

    getAllWithAttendance(): Observable<Member[]> {
        return this.http.get<Member[]>(this.apiUrl + `/attendance`);
    }

    getAttendanceById(id: Number) {
        return this.http.get(this.apiUrl + `/${id}/attendance`);
    }

    create(member: Member) {
        return this.http.post(this.apiUrl + `/create`, member);
    }

    update(member: Member) {
        return this.http.put(this.apiUrl + '/' + member.id, member);
    }

    delete(memberId: number) {
        return this.http.delete(this.apiUrl + `/${memberId}`);
    }

    addBadge(memberId: number, badgeId: number) {
        return this.http.post(`${this.apiUrl}/${memberId}/badges`, {
            badge: badgeId,
        });
    }

    static getAgeFromRC(rc) {
        const birthdayStr = this.getBirthdayFromRC(rc);
        const birthday = moment(birthdayStr, 'DD. MM. YYYY');
        return moment().diff(birthday, 'years');
    }

    static getBirthdayFromRC(rc) {
        let yearStr = rc.substring(0, 2);
        let month = parseInt(rc.substring(2, 4));
        let dayStr = parseInt(rc.substring(4, 6));

        // correct values
        if (yearStr > 50) {
            yearStr = '19' + yearStr;
        } else {
            yearStr = '20' + yearStr;
        }

        if (month > 50) {
            month = month - 50;
        }

        return '' + dayStr + '. ' + month + '. ' + yearStr;
    }

    static isWomanFromRC(rc) {
        let month = parseInt(rc.substring(2, 4));
        return month > 50;
    }
}
