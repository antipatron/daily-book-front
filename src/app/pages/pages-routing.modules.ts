import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardsComponent} from "./dashboards/dashboards.component";

const routes: Routes = [
  {
    path: 'provider-products', redirectTo: 'provider-products/admin'
  },
  {
    path: 'dashboard', component: DashboardsComponent
  },
  {
    path: 'provider-products', loadChildren: () => import('./provider-products/provider-products.module').then(m => m.ProviderProductsModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
