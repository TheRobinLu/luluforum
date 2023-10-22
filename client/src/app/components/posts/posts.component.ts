import {
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
	OnChanges,
	SimpleChanges,
} from "@angular/core";
import { Observable, Subject, take } from "rxjs";
import { IForum } from "src/app/interface/interfaces";
import { ForumService } from "src/app/services/forums.service";

@Component({
	selector: "app-posts",
	templateUrl: "./posts.component.html",
	styles: [],
})
export class PostsComponent implements OnInit {
	@Output() postSelected: EventEmitter<string> = new EventEmitter<string>();
	@Input() selectedCategory: string = "Home";
	page: number = 1;
	pages: number[] = [1, 2, 3];
	totalPages: number = 1;
	keywords: string = "";

	posts$: Observable<IForum[]> = new Observable();

	constructor(private forumService: ForumService) {}

	ngOnInit(): void {
		this.fetchForums();
		const language = navigator.language;
		console.log(language);
	}

	// eslint-disable-next-line @angular-eslint/use-lifecycle-interface
	ngOnChanges(changes: SimpleChanges) {
		if (changes["selectedCategory"]) {
			console.log("selectedCategory changed", this.selectedCategory);
			this.getTotal();
			this.fetchForums();
		}
	}

	private getTotal(): void {
		this.forumService
			.getTotalByCategory(this.selectedCategory)
			.subscribe((total: number) => {
				this.totalPages = total;
				console.log("~~component~~getTotalByCategory", this.totalPages);
			});

		this.totalPages = this.forumService.totalPages;
	}

	private fetchForums(): void {
		if (!this.selectedCategory) {
			this.posts$ = this.forumService.getForumsByCategoryName(
				"Home",
				this.page
			);
			console.log("-----Home-----", this.posts$);
			return;
		}
		this.posts$ = this.forumService.getForumsByCategoryName(
			this.selectedCategory,
			this.page
		);
	}

	onPageClick(page: number): void {
		this.page = page;
		if (page === 1) this.pages = [1, 2, 3];
		else if (page === this.totalPages) this.pages = [page - 2, page - 1, page];
		else this.pages = [page - 1, page, page + 1];

		console.log("onPageClick", page);
		this.fetchForums();
	}

	onPostClick(id: string | undefined): void {
		if (!id) return;
		this.postSelected.emit(id);
	}

	onSearchChange(keyword: string): void {
		this.keywords = keyword;
		console.log("onSearch", keyword);
		//this.posts$ = this.forumService.search(keyword);
	}

	onSearchClick(): void {
		console.log("onSearchClick", this.keywords);
		//this.posts$ = this.forumService.search(this.keywords);
	}
}
