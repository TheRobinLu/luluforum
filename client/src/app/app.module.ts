import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { EmployeesListComponent } from "./employees-list/employees-list.component";
import { EmployeeFormComponent } from "./employee-form/employee-form.component";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { AddEmployeeComponent } from "./add-employee/add-employee.component";
import { EditEmployeeComponent } from "./edit-employee/edit-employee.component";
import { CategoriesComponent } from "./components/categories/categories.component"; // <-- add this line
import { CategoriesMenuComponent } from "./components/categories/categoriesmenu.component";
import { ForumsComponent } from "./components/forums/forums.component";
import { PostsComponent } from "./components/posts/posts.component";
import { PostComponent } from "./components/post/post.component";

@NgModule({
	declarations: [
		AppComponent,
		EmployeesListComponent,
		EmployeeFormComponent,
		AddEmployeeComponent,
		EditEmployeeComponent,
		CategoriesComponent,
		CategoriesMenuComponent,
		ForumsComponent,
		PostsComponent,
		PostComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		ReactiveFormsModule, // <-- add this line
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
