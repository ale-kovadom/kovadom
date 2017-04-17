import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./page/home/home.component";
import {BrandsComponent} from "./page/brands/list/brands.component";
import {BrandDetailComponent} from "./page/brands/detail/brand-detail.component";
import {ActivitiesComponent} from "./page/activities/activities.component";
import {PageNotFoundComponent} from "./page/page_not_found/page-not-found.component";
import {HomeSaleHowToComponent} from "./page/home_sale_how_to/home-sale.how-to.component";

const routes:Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'brands/:brandCode', component: BrandDetailComponent},
    {path: 'brands', component: BrandsComponent},
    {path: 'activities', component: ActivitiesComponent},
    {path: 'homesalehowto', component: HomeSaleHowToComponent},
    {path: '**', component: PageNotFoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {
}
