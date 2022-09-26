import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../../environments/environment';
import { Badge } from './../models/badge';

@Injectable({
    providedIn: 'root',
})
export class BadgeService {
    private apiUrl = environment.API_URL + '/badges';

    constructor(private http: HttpClient) {}

    getAll() {
        return this.http.get<Badge[]>(this.apiUrl);
    }

    add(badge: Badge) {
        return this.http.post(this.apiUrl + '/create', badge);
    }

    update(badge: Badge) {
        return this.http.put(this.apiUrl + '/' + badge.id, badge);
    }

    delete(badgeId) {
        return this.http.delete(this.apiUrl + '/' + badgeId);
    }

    getForAllMembers() {
        return this.http.get<any>(this.apiUrl + '/members');
    }
}
