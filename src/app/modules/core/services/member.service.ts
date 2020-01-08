import { environment } from './../../../../environments/environment';
import { Member } from './../models/member';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MemberService {
    private apiUrl = environment.API_URL;

    constructor(private http: HttpClient) {}

    getAll() {
        return this.http.get<Member[]>(this.apiUrl + `/members`);
    }

    getAllWithAttendance() {
        return this.http.get<Member[]>(this.apiUrl + `/members/attendance`);
    }

    getAttendanceById(id: Number) {
        return this.http.get(this.apiUrl + `/members/${id}/attendance`);
    }
}
