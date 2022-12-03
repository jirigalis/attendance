import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AttendanceService {
    private apiUrl = environment.API_URL;

    constructor(private http: HttpClient) {}

    getByDate(date: String) {
        return this.http.get(this.apiUrl + `/attendance/${date}`);
    }

    addAttendance(date: String, memberIds) {
        return this.http.post(this.apiUrl + `/attendance/${date}`, memberIds);
    }

    getMembersByAttendanceCount(schoolyearId: number) {
        return this.http.get<any>(this.apiUrl + '/attendance/best-members/' + schoolyearId);
    }

    getMembersAttendancePoints(memberId: number) {
        return this.http.get(this.apiUrl + '/attendance/points/' + memberId);
    }

    getAllDates() {
        return this.http.get<any>(this.apiUrl + `/meetingdates`);
    }

    getAllDatesBySchoolyear(schoolyearId) {
        return this.http.get<any>(this.apiUrl + `/meetingdates/` + schoolyearId);
    }

    addMeetingDate(date) {
        return this.http.post(this.apiUrl + `/meetingdates/create`, date);
    }

    deleteMeetingDate(id: number) {
        return this.http.delete(this.apiUrl + '/meetingdates/' + id);
    }

    getAverageAttendanceForSchoolyear(schoolyearId: number) {
        return this.http.get(this.apiUrl + '/attendance/average/' + schoolyearId);
    }
}
