import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    private apiUrl = environment.API_URL;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(
            JSON.parse(localStorage.getItem('currentUser'))
        );
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
                map(data => {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    const currentUser = {
                        token: data,
                        user: {
                            username: username
                        }
                    };
                    console.log('Add logged user to the local storage');
                    localStorage.setItem(
                        'currentUser',
                        JSON.stringify(currentUser)
                    );
                    this.currentUserSubject.next(data);
                    return data;
                })
            );
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        location.reload();
    }
}
