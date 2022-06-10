import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SeatsResolver } from "./resolvers/seats.resolver";
import { SessionComponent } from "./session.component";
import { SessionResolver } from "./resolvers/session.resolver";

const routes: Routes = [
  {
    path: ":id",
    component: SessionComponent,
    resolve: {
      session: SessionResolver,
      seats: SeatsResolver,
    },
  },
  {
    path: "",
    redirectTo: "/",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SessionRoutingModule {}
