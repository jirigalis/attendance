import { environment } from './../../../../environments/environment';
import { Member } from './../models/member';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MemberService {
    private apiUrl = environment.API_URL + '/members';

    constructor(private http: HttpClient) {}

    getAll() {
        return this.http.get<Member[]>(this.apiUrl);
    }

    getAllWithAttendance() {
        return this.http.get<Member[]>(this.apiUrl + `/attendance`);
    }

    getAttendanceById(id: Number) {
        return this.http.get(this.apiUrl + `/${id}/attendance`);
    }

    create(member: Member) {
        return this.http.post(this.apiUrl + `/create`, member);
    }

    delete(memberId: number) {
        return this.http.delete(this.apiUrl + `/${memberId}`);
    }
}
