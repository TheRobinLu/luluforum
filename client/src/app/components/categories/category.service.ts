import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject, tap } from "rxjs";
import { ICategory } from "../../interface/interfaces";

@Injectable({
	providedIn: "root",
})
export class CategoryService {
	private url = process.env["API_URL"];
	private categories$: Subject<ICategory[]> = new Subject();

	constructor(private httpClient: HttpClient) {}

	private refreshCategories() {
		this.httpClient
			.get<ICategory[]>(`${this.url}/categories`)
			.subscribe((categories) => {
				this.categories$.next(categories);
			});
	}

	getCategories(): Subject<ICategory[]> {
		this.refreshCategories();
		return this.categories$;
	}

	getCategory(id: string): Observable<ICategory> {
		return this.httpClient.get<ICategory>(`${this.url}/categories/${id}`);
	}

	createCategory(category: ICategory): Observable<string> {
		return this.httpClient.post(`${this.url}/categories`, category, {
			responseType: "text",
		});
	}

	updateCategory(id: string, category: ICategory): Observable<string> {
		return this.httpClient.put(`${this.url}/categories/${id}`, category, {
			responseType: "text",
		});
	}

	deleteCategory(id: string): Observable<string> {
		return this.httpClient.delete(`${this.url}/categories/${id}`, {
			responseType: "text",
		});
	}
}
