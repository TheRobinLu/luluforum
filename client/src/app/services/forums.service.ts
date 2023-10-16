import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject, map, tap } from "rxjs";
import { IForum } from "../interface/interfaces";
import { environment } from "src/environments/environment";

@Injectable({
	providedIn: "root",
})
export class ForumService {
	private url: string;
	private forums$: Subject<IForum[]> = new Subject();
	private posts$: Subject<IForum[]> = new Subject();
	private post$: Subject<IForum> = new Subject();
	private totalPages$: Subject<number> = new Subject();
	public totalPages: number = 1;

	constructor(private httpClient: HttpClient) {
		this.url = environment.apiUrl;
	}

	private refreshForums() {
		this.httpClient.get<IForum[]>(`${this.url}/forums`).subscribe((forums) => {
			this.forums$.next(forums);
		});
	}

	getForums(): Subject<IForum[]> {
		this.refreshForums();
		return this.forums$;
	}

	getForumsByCategoryName(name: string, page: number): Subject<IForum[]> {
		console.log(
			"getForumsByCategoryName",
			`${this.url}/forums/categoryname/${name}/${page}`
		);

		this.httpClient
			.get<IForum[]>(`${this.url}/forums/categoryname/${name}/${page}`)
			.subscribe((posts) => {
				this.posts$.next(posts);
			});

		return this.posts$;
	}

	getForum(id: string): Subject<IForum[]> {
		this.getForumById(id);
		return this.forums$;
	}

	getTotalByCategory(categoryname: string): Observable<number> {
		const result = this.httpClient
			.get<number>(`${this.url}/forums/total/${categoryname}`)
			// 	.subscribe((total: any) => {
			// 		this.totalPages = total.totalPages;
			// 		this.totalPages$.next(total);
			// 		console.log("~~~~getTotalByCategory", this.totalPages);
			// 		return this.totalPages;
			// 	});
			// console.log("~~out~~getTotalByCategory", this.totalPages);
			// return this.totalPages;
			.pipe(
				map((total: any) => {
					this.totalPages = total.totalPages;
					return this.totalPages;
				})
			);

		return result;
	}

	createForum(forum: IForum): Observable<string> {
		return this.httpClient.post(`${this.url}/forums`, forum, {
			responseType: "text",
		});
	}

	updateForum(id: string, forum: IForum): Observable<string> {
		return this.httpClient.put(`${this.url}/forums/${id}`, forum, {
			responseType: "text",
		});
	}

	getForumById(id: string): Subject<IForum> {
		this.httpClient
			.get<IForum>(`${this.url}/forums/id/${id}`)
			.subscribe((post) => {
				this.post$.next(post);
			});

		return this.post$;
	}
}
