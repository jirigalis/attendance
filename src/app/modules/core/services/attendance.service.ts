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

    addAttendance(date: String, data) {
        return this.http.post(this.apiUrl + `/attendance/${date}`, data);
    }

    getMembersByAttendanceCount(schoolyearId: number) {
        return this.http.get<any>(this.apiUrl + '/attendance/best-members/' + schoolyearId);
    }

    getMembersAttendancePoints(memberId: number, schoolyearId: number = null) {
        if (schoolyearId) {
            return this.http.get(this.apiUrl + '/attendance/points/' + memberId + '/' + schoolyearId);
        }
        return this.http.get(this.apiUrl + '/attendance/points/' + memberId);
    }

    getAllDates() {
        return this.http.get<any>(this.apiUrl + `/meetingdates`);
    }

    getAllDatesBySchoolyear(schoolyearId) {
        return this.http.get<any>(this.apiUrl + `/meetingdates/` + schoolyearId);
    }

    addMeetingDate(date, description) {
        return this.http.post(this.apiUrl + `/meetingdates/create`, {date, description});
    }
    
    editMeetingDate(meetingDate) {
        return this.http.put(this.apiUrl + `/meetingdates/${meetingDate.id}`, meetingDate);
    }

    deleteMeetingDate(id: number) {
        return this.http.delete(this.apiUrl + '/meetingdates/' + id);
    }

    getAverageAttendanceForSchoolyear(schoolyearId: number) {
        return this.http.get(this.apiUrl + '/attendance/average/' + schoolyearId);
    }
}
