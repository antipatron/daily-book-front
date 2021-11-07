import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardsComponent} from "./dashboards/dashboards.component";
import {ProductAdminComponent} from "./product/product-admin.component";
import {ProviderAdminComponent} from "./provider/provider-admin.component";

const routes: Routes = [
  {
    path: 'product', component: ProductAdminComponent
  },
  {
    path: 'provider', component: ProviderAdminComponent
  },
  {
    path: 'dashboard', component: DashboardsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
