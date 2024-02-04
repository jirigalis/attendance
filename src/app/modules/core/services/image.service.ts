import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Image } from '../models/image';

@Injectable({
    providedIn: 'root'
})
export class ImageService {
    private apiUrl = environment.API_URL + '/image';

    constructor(private http: HttpClient) {}

    getAll() {
        return this.http.get<Image[]>(this.apiUrl);
    }

    create(image: Image) {
        return this.http.post(this.apiUrl + '/create', image);
    }

    getById(imageId) {
        return this.http.get<Image>(this.apiUrl + `/${imageId}`);
    }

    update(image: Image) {
        return this.http.put(this.apiUrl + '/' + image.id, image);
    }

    updatePath(imageId, path) {
        return this.http.put(this.apiUrl + '/' + imageId + '/update-path', path);
    }

    delete(imageId) {
        return this.http.delete(this.apiUrl + '/' + imageId);
    }

    getByCategories(categories) {
        return this.http.post<Image[]>(this.apiUrl + '/get-by-categories', categories);
    }

}
