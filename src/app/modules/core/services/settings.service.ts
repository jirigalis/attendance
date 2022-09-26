import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Schoolyear } from '../models';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {
    private apiUrl = environment.API_URL;

    constructor(private http: HttpClient) { }

}
