import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {DetailComponent} from "./brands/detail.component";
import {HomeComponent} from "./home/home.component";

const routes:Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'detail/:name', component: DetailComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {
}
