import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from "./brands/app.component";
import {DetailComponent} from "./brands/detail.component";

const routes:Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: AppComponent},
    {path: 'detail/:name', component: DetailComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
