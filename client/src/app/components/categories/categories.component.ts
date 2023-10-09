import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";

import { ICategory } from "../../interface/interfaces";
import { CategoryService } from "./category.service";

@Component({
	selector: "app-categories",
	templateUrl: "./categories.component.html",
	styles: [],
})
export class CategoriesComponent implements OnInit {
	categories$: Observable<ICategory[]> = new Observable();

	constructor(private categoryService: CategoryService) {}
	ngOnInit(): void {
		this.fetchCategories();
	}

	deleteCategory(id: string): void {
		this.categoryService.deleteCategory(id).subscribe({
			next: () => this.fetchCategories(),
		});
	}
	private fetchCategories(): void {
		this.categories$ = this.categoryService.getCategories();
	}
}
