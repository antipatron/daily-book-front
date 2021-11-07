import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WidgetModule } from './widget/widget.module';
import { PagetitleComponent } from './pagetitle/pagetitle.component';
import { AvatarComponent } from './avatar/avatar.component';
import {TranslateModule} from "@ngx-translate/core";
import {ValidateDirective} from "./validator/validate.directive";
import {AuthorizeDirective} from './authorization/authorize.directive';

@NgModule({
  declarations: [
    PagetitleComponent,
    AvatarComponent,
    ValidateDirective,
    AuthorizeDirective
  ],
  imports: [
    CommonModule,
    TranslateModule,
    WidgetModule
  ],
  exports: [PagetitleComponent, AvatarComponent, TranslateModule, ValidateDirective, AuthorizeDirective,]
})
export class SharedModule { }
