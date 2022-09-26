import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../../environments/environment';
import { Reason } from './../models/reason';

@Injectable({
    providedIn: 'root'
})
export class ReasonService {
    private apiUrl = environment.API_URL + '/reason';

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Reason[]>(this.apiUrl);
    }

    add(reason: Reason) {
        return this.http.post(this.apiUrl + '/create', reason);
    }

    update(reason: Reason) {
        return this.http.put(this.apiUrl + '/' + reason.id, reason);
    }

    delete(reasonId) {
        return this.http.delete(this.apiUrl + '/' + reasonId);
    }
}
