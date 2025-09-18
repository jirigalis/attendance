import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

import { User } from '../models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    private apiUrl = environment.API_URL;
    private http = inject(HttpClient);

    constructor() {
        const userLS = this.getCurrentUserObjectFromToken()
        if (userLS && this.getSchoolyearFromLS()) {
            userLS.schoolyear = this.getSchoolyearFromLS();
        }
        this.currentUserSubject = new BehaviorSubject<User>(userLS);
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http
            .post<any>(this.apiUrl + `/user/authenticate`, {
                username,
                password
            })
            .pipe(
                map(token => {                    
                    localStorage.setItem('apiToken', token);
                    this.currentUserSubject.next(this.getCurrentUserObjectFromToken(token));
                    this.saveSchoolyearToLS();
                    return token;
                })
            );
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('apiToken');
        this.currentUserSubject.next(null);
        location.reload();
    }

    private getCurrentUserObjectFromToken(token = ''): any {
        if (!token) {
            token = localStorage.getItem('apiToken');
        }
        if (!token) {
            return null;
        }
        const decodedToken: any = jwtDecode(token);
        return {
            username: decodedToken.context.user.username,
            id: decodedToken.context.user.id,
            schoolyear: decodedToken.context.user.schoolyear,
            token: token
        }
    }

    public getSchoolyear() {
        return this.currentUserValue.schoolyear;
    }

    public selectSchoolyear(schoolyearId) {
        this.http.post(this.apiUrl + `/user/${this.currentUserValue.id}/select-schoolyear`, {schoolyear: schoolyearId}).subscribe(res => {
            if (res) {
                const user = this.currentUserValue;
                user.schoolyear = schoolyearId;
                this.currentUserSubject.next(user);
                this.saveSchoolyearToLS();
            }
        })
    }

    private saveSchoolyearToLS() {
        localStorage.setItem('schoolyear', this.currentUserValue.schoolyear.toString());
    }

    private getSchoolyearFromLS() {
        return Number(localStorage.getItem('schoolyear'));
    }
}