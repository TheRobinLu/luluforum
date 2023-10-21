import { Component, Input, OnInit } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { IForum, IGPTPrompt } from "src/app/interface/interfaces";
import { ForumService } from "src/app/services/forums.service";

@Component({
	selector: "app-post",
	templateUrl: "./post.component.html",
	styles: [],
})
export class PostComponent implements OnInit {
	@Input() postId: string = "";

	prompt$: Subject<IGPTPrompt> = new Subject();

	post$: Subject<IForum> = new Subject();
	thisPost: IForum = {} as IForum;

	constructor(private forumService: ForumService) {}

	ngOnInit(): void {
		this.fetchPost();
		const language = navigator.language;
		console.log(language);
	}

	private fetchPost(): void {
		console.log("-----PostId-----", this.postId);
		this.forumService.getForumById(this.postId).subscribe((post: IForum) => {
			this.post$.next(post);

			this.forumService.getPromptById(post.gptPromptId).subscribe((prompt) => {
				this.prompt$.next(prompt);
			});

			console.log("-----fetchPost-----", post);
		});
	}
}
