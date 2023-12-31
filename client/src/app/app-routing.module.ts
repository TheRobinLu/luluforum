import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EmployeesListComponent } from "./employees-list/employees-list.component";
import { AddEmployeeComponent } from "./add-employee/add-employee.component"; // <-- add this line
import { EditEmployeeComponent } from "./edit-employee/edit-employee.component"; // <-- add this line
import { CategoriesMenuComponent } from "./components/categories/categoriesmenu.component";
import { ForumsComponent } from "./components/forums/forums.component";

const routes: Routes = [
	{ path: "", redirectTo: "forums", pathMatch: "full" },
	{ path: "employees", component: EmployeesListComponent },
	{ path: "employees/new", component: AddEmployeeComponent }, // <-- add this line
	{ path: "employees/edit/:id", component: EditEmployeeComponent },
	{ path: "categoriesmenu", component: CategoriesMenuComponent },
	{ path: "forums", component: ForumsComponent },
]; // <-- add this line

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
