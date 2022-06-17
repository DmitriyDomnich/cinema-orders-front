import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { CreateComponent } from "./create/create.component";
import { UpdateComponent } from "./update/update.component";

const routes: Routes = [
  {
    path: "sessions",
    component: AdminComponent,
  },
  {
    path: "u/:id",
    component: UpdateComponent,
  },
  {
    path: "c",
    component: CreateComponent,
  },
  {
    path: "",
    pathMatch: "full",
    redirectTo: "sessions",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
