import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Schoolyear } from '../models';

@Injectable({
    providedIn: 'root'
})
export class SchoolyearService {
    private apiUrl = environment.API_URL + '/schoolyear';

    constructor(private http: HttpClient) { }

    getAllSchoolyears() {
        return this.http.get<Schoolyear[]>(this.apiUrl);
    }

    addSchoolyear(schoolyear: Schoolyear) {
        schoolyear.startDate = moment(schoolyear.startDate).utc(true)
        schoolyear.endDate = moment(schoolyear.endDate).utc(true)
        return this.http.post(this.apiUrl + '/create', schoolyear);
    }

    update(schoolyear: Schoolyear) {
        schoolyear.startDate = moment(schoolyear.startDate).utc(true)
        schoolyear.endDate = moment(schoolyear.endDate).utc(true)
        return this.http.put(this.apiUrl + '/' + schoolyear.id, schoolyear);
    }

    delete(schoolyearId) {
        return this.http.delete(this.apiUrl + '/' + schoolyearId);
    }

    getById(schoolyearId): Observable<Schoolyear> {
        return this.http.get<Schoolyear>(this.apiUrl + '/' + schoolyearId);
    }

    addMemberToSchoolyear(memberId, schoolyearId) {
        return this.http.post(this.apiUrl + `/${schoolyearId}/add-member`, { memberId: memberId})
    }

    removeMemberFromSchoolyear(memberId, schoolyearId) {
        return this.http.post(this.apiUrl + `/${schoolyearId}/remove-member`, { memberId: memberId})
    }

    getCurrent(): Observable<Schoolyear> {
        return this.http.get<Schoolyear>(this.apiUrl + '/current');
    }

}
