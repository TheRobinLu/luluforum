import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Observable } from "rxjs";

import { IForum } from "../../interface/interfaces";

@Component({
	selector: "app-forums",
	templateUrl: "./forums.component.html",
	// template: `<p>component html categories works!</p>`,
	styles: [],
})
export class ForumsComponent implements OnInit {
	selectedCategory: string = "Home";
	selectedPostId: string = ""; //"this is postid";
	// forums$: Observable<IForum[]> = new Observable();
	isChinese: boolean = false;

	handleCategorySelected(category: string) {
		this.selectedCategory = category;
	}

	handlePostSelected(postId: string) {
		this.selectedPostId = postId;
		console.log("handlePostSelected", this.selectedPostId);
	}
	constructor() {}

	ngOnInit(): void {
		const language = navigator.language;
		console.log(language);
		this.isChinese = language.toLowerCase().includes("zh");
	}
}
