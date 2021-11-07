import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SettingsRoutingModule} from "./settings-routing.module";
import {TranslateModule} from "@ngx-translate/core";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TableModule} from "primeng/table";
import {InputSwitchModule} from "primeng/inputswitch";
import {MultiSelectModule} from 'primeng/multiselect';
import {AutoCompleteModule} from "primeng/autocomplete";
import {SharedModule} from "../../shared/shared.module";
import {TrimOnBlurModule} from "ng2-trim-on-blur";
import {DropdownModule} from "primeng/dropdown";
import {PaginatorModule} from "primeng/paginator";


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    TableModule,
    ReactiveFormsModule,
    InputSwitchModule,
    MultiSelectModule,
    AutoCompleteModule,
    SharedModule,
    TrimOnBlurModule,
    DropdownModule,
    PaginatorModule,
  ],
  exports: [
    SettingsRoutingModule
  ],
  providers: [
    FormBuilder
  ]

})
export class SettingsModule { }
