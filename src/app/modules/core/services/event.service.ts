import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import moment from 'moment';
import { Observable } from 'rxjs';
import { Event } from '../models/event';
import { environment } from '../../../../environments/environment';

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

    getById(eventId): Observable<Event> {
        return this.http.get<Event>(this.apiUrl + `/${eventId}`);
    }

    update(event: Event) {
        event.startDate = moment(event.startDate).utc(true);
        event.endDate = moment(event.endDate).utc(true);
        return this.http.put(this.apiUrl + '/' + event.id, event);
    }

    delete(eventId) {
        return this.http.delete(this.apiUrl + '/' + eventId);
    }

    addMembersToEvent(data) {
        return this.http.post(this.apiUrl + `/${data.eventId}/add-members`, { members: data.members });
    }

    removeMember(eventId, memberId) {
        return this.http.post(this.apiUrl + `/${eventId}/remove-member`, { id: memberId})
    }

    getByMemberAndSchoolyear(memberId, schoolyearId) {
        return this.http.get<Event[]>(this.apiUrl + '/member/' + memberId + '/' + schoolyearId);
    }

    markParticipation(eventId: number, memberId: number, participated: boolean) {
        return this.http.post(this.apiUrl + `/${eventId}/mark-participation`, { memberId, participated });
    }

    openRegistration(eventId: number) {
        return this.http.post(this.apiUrl + `/${eventId}/open-registration`, {});
    }

    closeRegistration(eventId: number) {
        return this.http.post(this.apiUrl + `/${eventId}/close-registration`, {});
    }
}
