import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { SessionsResolver } from "./home/sessions.resolver";

const routes: Routes = [
  {
    path: "login",
    loadChildren: () =>
      import("./login/login.module").then((m) => m.LoginModule),
  },
  {
    path: "register",
    loadChildren: () =>
      import("./register/register.module").then((m) => m.RegisterModule),
  },
  {
    path: "bucket",
    loadChildren: () =>
      import("./bucket/bucket.module").then((m) => m.BucketModule),
  },
  {
    path: "",
    component: HomeComponent,
    resolve: {
      sessions: SessionsResolver,
    },

    runGuardsAndResolvers: "paramsOrQueryParamsChange",
  },
  {
    path: "s",
    loadChildren: () =>
      import("./session/session.module").then((m) => m.SessionModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: "top",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
