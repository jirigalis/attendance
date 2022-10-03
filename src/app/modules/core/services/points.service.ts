import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../../environments/environment';
import { Points } from './../models/points';

@Injectable({
    providedIn: 'root',
})
export class PointsService {
    private apiUrl = environment.API_URL + '/points';

    constructor(private http: HttpClient) {}

    getAll() {
        return this.http.get<Points[]>(this.apiUrl);
    }

    getByMember(id) {
        return this.http.get<Points[]>(this.apiUrl + '/' + id);
    }

    getSumByMember(id) {
        return this.http.get(this.apiUrl + '/sum/' + id);
    }

    getSumForAllMembers(params = {}) {
        return this.http.get<any>(this.apiUrl + '/sum', {params: params});
    }

    getSumForAllMembersByRole(role) {
        return this.http.get<any>(this.apiUrl + '/sum/role/' + role);
    }

    getPublicSum(schoolyearId) {
        return this.http.get<any>(this.apiUrl + '/sum/public/' + schoolyearId);
    }

    add(points: Points) {
        return this.http.post(this.apiUrl + '/create', points);
    }

    addBulk(points: Points[]) {
        return this.http.post(this.apiUrl + '/bulk', points);
    }

    update(points: Points) {
        return this.http.put(this.apiUrl + '/' + points.id, points);
    }

    delete(pointsId) {
        return this.http.delete(this.apiUrl + '/' + pointsId);
    }
}
