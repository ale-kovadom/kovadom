import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./page/home/home.component";
import {BrandsComponent} from "./page/brands/list/brands.component";
import {BrandDetailComponent} from "./page/brands/detail/brand-detail.component";
import {ActivitiesComponent} from "./page/activities/activities.component";

const routes:Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'brands/:brandCode', component: BrandDetailComponent},
    {path: 'brands', component: BrandsComponent},
    {path: 'activities', component: ActivitiesComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {
}
