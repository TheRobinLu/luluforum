import {
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
	OnChanges,
	SimpleChanges,
} from "@angular/core";
import { Observable } from "rxjs";
import { IForum } from "src/app/interface/interfaces";
import { ForumService } from "src/app/services/forums.service";

@Component({
	selector: "app-posts",
	templateUrl: "./posts-search.component.html",
	styles: [],
})
export class PostsComponent implements OnInit {
	@Output() postSelected: EventEmitter<string> = new EventEmitter<string>();
	@Input() selectedCategory?: string;
	page: number = 1;

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
			this.fetchForums();
		}
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
}
