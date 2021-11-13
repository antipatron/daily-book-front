import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductAdminComponent} from "./product/product-admin.component";
import {ProviderAdminComponent} from "./provider/provider-admin.component";
import {ProductCreateComponent} from "./product/product-create/product-create.component";

const routes: Routes = [
  {
    path: 'admin/product', component: ProductAdminComponent
  },
  {
    path: 'admin/product/create', component: ProductCreateComponent
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
