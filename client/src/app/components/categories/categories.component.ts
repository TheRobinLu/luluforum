import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";

import { ICategory } from "../../interface/interfaces";
import { CategoryService } from "../../services/category.service";

@Component({
	selector: "app-categories",
	templateUrl: "./categories.component.html",
	// template: `<p>component html categories works!</p>`,
	styles: [],
})
export class CategoriesComponent implements OnInit {
	categories$: Observable<ICategory[]> = new Observable();
	isChinese: boolean = false;

	constructor(private categoryService: CategoryService) {}

	public onCategoryClick(category: any) {
		console.log(category);
	}

	ngOnInit(): void {
		this.fetchCategories();
		const language = navigator.language;
		console.log(language);
		this.isChinese = language.toLowerCase().includes("zh");
	}

	deleteCategory(id: string): void {
		this.categoryService.deleteCategory(id).subscribe({
			next: () => this.fetchCategories(),
		});
	}
	private fetchCategories(): void {
		this.categories$ = this.categoryService.getCategories();
		console.log(this.categories$);
	}
}
