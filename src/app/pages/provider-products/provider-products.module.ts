import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductAdminComponent} from "./product/product-admin.component";
import {ProviderProductsRoutingModules} from "./provider-products-routing.modules";
import {ProviderAdminComponent} from "./provider/provider-admin.component";
import {SharedModule} from "../../shared/shared.module";
import {NgbDropdownModule, NgbNavModule} from "@ng-bootstrap/ng-bootstrap";
import {SimplebarAngularModule} from "simplebar-angular";
import {TranslateModule} from "@ngx-translate/core";
import {ProductListComponent} from './product/list/product-list.component';
import {TableModule} from "primeng/table";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ProductEditComponent } from './product/edit/product-edit.component';
import { InputNumberModule } from 'primeng/inputnumber';
import {DropdownModule} from "primeng/dropdown";


@NgModule({
  declarations: [
    ProductAdminComponent,
    ProviderAdminComponent,
    ProductListComponent,
    ProductEditComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProviderProductsRoutingModules,
    NgbNavModule,
    NgbDropdownModule,
    SimplebarAngularModule,
    TranslateModule,
    TableModule,
    InputTextModule,
    InputNumberModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
  ]
})
export class ProviderProductsModule { }
