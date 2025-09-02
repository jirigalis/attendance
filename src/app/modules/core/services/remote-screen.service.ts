import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export type RemoteScreenData = {
    type: string;
    value: any;
}

export type RemoteScreenResponse = {
    update: number;
    data: RemoteScreenData;
}

export enum RemoteScreenType {
    TEXT = "text",
    IMAGE = "image",
}

@Injectable({
    providedIn: 'root'
})
export class RemoteScreenService {
    private apiUrl = environment.API_URL + '/remote-screen';

    constructor(private http: HttpClient) {}

    checkForUpdates(userId: number) {
        return this.http.get(this.apiUrl + '/' + userId + '/updates');
    }

    sendUpdate(userId: number, update: RemoteScreenData) {
        return this.http.put<Observable<RemoteScreenResponse>>(this.apiUrl + '/' + userId + '/update', update);
    }
}