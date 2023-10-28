import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
	Observable,
	Subject,
	filter,
	interval,
	switchMap,
	take,
	tap,
} from "rxjs";
import { ICategory } from "../interface/interfaces";
import { environment } from "src/environments/environment";

@Injectable({
	providedIn: "root",
})
export class CategoryService {
	[x: string]: any;
	private url: string;
	private categories$: Subject<ICategory[]> = new Subject();
	private version$: Subject<string> = new Subject();

	constructor(private httpClient: HttpClient) {
		this.url = environment.apiUrl;
	}

	private delay(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	private async refreshCategories() {
		console.log("=======categories start");
		this.httpClient.get<ICategory[]>(`${this.url}/categories`).subscribe(
			// (err) => console.log(err),
			(categories) => {
				console.log("=======categories: ", categories);
				if (categories.length > 0) {
					this.categories$.next(categories);
				} else {
					return;
				}
			}
		);

		await this.delay(1000);
	}

	getCategories(): Observable<ICategory[]> {
		this.refreshCategories();
		return this.categories$;
	}

	getCategory(id: string): Observable<ICategory> {
		return this.httpClient.get<ICategory>(`${this.url}/categories/id/${id}`);
	}

	getversion(): Observable<string> {
		interface IVersion {
			ver: string;
		}

		this.httpClient
			.get<IVersion>(`${this.url}/categories/ver`)
			.subscribe((res) => {
				console.log("=======version: ", res.ver);
				this.version$.next(res.ver);
			});

		return this.version$;
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
