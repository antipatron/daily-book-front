import {TableModule} from 'primeng/table';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CountToModule} from 'angular-count-to';

import {ScrollToModule} from '@nicky-lenaers/ngx-scroll-to';
import {NgApexchartsModule} from 'ng-apexcharts';
import {
  NgbAccordionModule,
  NgbDropdownModule,
  NgbNavModule,
  NgbPopoverModule,
  NgbProgressbarModule,
  NgbTooltipModule
} from '@ng-bootstrap/ng-bootstrap';
import {AgmCoreModule} from '@agm/core';

import {PagesRoutingModule} from './pages-routing.modules';
import {DashboardsComponent} from './dashboards/dashboards.component';
import {WidgetModule} from '../shared/widget/widget.module';
import {SharedModule} from '../shared/shared.module';
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {AutoCompleteModule} from "primeng/autocomplete";
import {DropdownModule} from "primeng/dropdown";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    DashboardsComponent
  ],
  imports: [
    CommonModule,
    WidgetModule,
    PagesRoutingModule,
    ScrollToModule.forRoot(),
    NgApexchartsModule,
    NgbDropdownModule,
    NgbAccordionModule,
    NgbNavModule,
    NgbProgressbarModule,
    NgbTooltipModule,
    NgbPopoverModule,
    CountToModule,
    SharedModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAbvyBxmMbFhrzP9Z8moyYr6dCr-pzjhBE'
    }),
    TableModule,
    NgxChartsModule,
    AutoCompleteModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    FormBuilder
  ]
})
export class PagesModule { }
