import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Observable } from "rxjs";

import { ICategory } from "../../interface/interfaces";
import { CategoryService } from "../../services/category.service";
// input output category

@Component({
	selector: "app-categoriesmenu",
	templateUrl: "./categoriesmenu.component.html",
	// template: `<p>component html categories works!</p>`,
	styles: [],
})
export class CategoriesMenuComponent implements OnInit {
	@Output() categorySelected: EventEmitter<string> = new EventEmitter<string>();
	categories$: Observable<ICategory[]> = new Observable();
	isChinese: boolean = false;

	constructor(private categoryService: CategoryService) {}

	public onCategoryClick(category: any) {
		this.categorySelected.emit(category);
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
