import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Event } from '../models/event';
import { environment } from './../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class EventService {
    private apiUrl = environment.API_URL + '/event';

    constructor(private http: HttpClient) {}

    getAll() {
        return this.http.get<Event[]>(this.apiUrl);
    }

    add(event: Event) {
        event.startDate = moment(event.startDate).utc(true);
        event.endDate = moment(event.endDate).utc(true);
        return this.http.post(this.apiUrl + '/create', event);
    }

    getById(eventId) {
        return this.http.get(this.apiUrl + `/${eventId}`);
    }

    update(event: Event) {
        event.startDate = moment(event.startDate).utc(true);
        event.endDate = moment(event.endDate).utc(true);
        return this.http.put(this.apiUrl + '/' + event.id, event);
    }

    delete(eventId) {
        return this.http.delete(this.apiUrl + '/' + eventId);
    }

    addMembersToSchoolyear(data) {
        console.log(data);
        return this.http.post(this.apiUrl + `/${data.eventId}/add-members`, { members: data.members });
    }

}
