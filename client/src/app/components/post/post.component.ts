import { Component, Input, OnInit } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { IForum } from "src/app/interface/interfaces";
import { ForumService } from "src/app/services/forums.service";

@Component({
	selector: "app-post",
	templateUrl: "./post.component.html",
	styles: [],
})
export class PostComponent implements OnInit {
	@Input() postId: string = "";

	post$: Subject<IForum> = new Subject();

	constructor(private forumService: ForumService) {}

	ngOnInit(): void {
		this.fetchPost();
		const language = navigator.language;
		console.log(language);
	}

	private fetchPost(): void {
		this.post$ = this.forumService.getForumById(this.postId);
		console.log(this.post$);
	}
}
