import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductAdminComponent} from "./product/product-admin.component";
import {ProviderAdminComponent} from "./provider/provider-admin.component";
import {ProductEditComponent} from "./product/edit/product-edit.component";
import {ProductResolverService} from "../../shared/resolver/product-resolver.service";
import {ProviderEditComponent} from './provider/edit/provider-edit.component';
import {ProviderResolverService} from '../../shared/resolver/provider-resolver.service';

const routes: Routes = [
  {
    path: 'admin/product', component: ProductAdminComponent
  },
  {
    path: 'admin/product/create', component: ProductEditComponent
  },
  {
    path: 'admin/product/edit/:idProduct', component: ProductEditComponent,
    resolve: {
      product: ProductResolverService
    }
  },
  {
    path: 'admin/provider', component: ProviderAdminComponent
  },
  {
    path: 'admin/provider/create', component: ProviderEditComponent
  },
  {
    path: 'admin/provider/edit/:idProvider', component: ProviderEditComponent,
    resolve: {
      provider: ProviderResolverService
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProviderProductsRoutingModules {
}
