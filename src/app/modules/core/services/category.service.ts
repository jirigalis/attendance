import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private apiUrl = environment.API_URL + '/category';

    constructor(private http: HttpClient) { }
    
    getAll() {
        return this.http.get<Category[]>(this.apiUrl);
    }

    create(category: Category) {
        return this.http.post(this.apiUrl + '/create', category);
    }

    getById(categoryId) {
        return this.http.get<Category>(this.apiUrl + `/${categoryId}`);
    }

    update(category: Category) {
        return this.http.put(this.apiUrl + '/' + category.id, category);
    }

    delete(categoryId) {
        return this.http.delete(this.apiUrl + '/' + categoryId);
    }

}
