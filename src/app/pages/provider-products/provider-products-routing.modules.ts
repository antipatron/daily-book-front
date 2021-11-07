import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductAdminComponent} from "./product/product-admin.component";
import {ProviderAdminComponent} from "./provider/provider-admin.component";

const routes: Routes = [
  {
    path: 'admin/product', component: ProductAdminComponent
  },
  {
    path: 'admin/provider', component: ProviderAdminComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProviderProductsRoutingModules {
}
