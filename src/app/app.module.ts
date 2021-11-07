import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule, NgbNavModule, NgbPopoverModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {LayoutsModule} from './layouts/layouts.module';
import {PagesModule} from './pages/pages.module';
import {HttpErrorInterceptor} from './core/helpers/http-error.interceptor';
import {HttpSuccessInterceptor} from './core/helpers/http-success.interceptor';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {ToastModule} from "primeng/toast";
import {ConfirmationService, MessageService} from 'primeng/api';
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {MenuService} from './core/menu/menu.service';
import {TrimOnBlurModule} from "ng2-trim-on-blur";

export function createTranslateLoader(http: HttpClient): any {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    NgbModule,
    NgbTooltipModule,
    NgbPopoverModule,
    NgbNavModule,
    LayoutsModule,
    TranslateModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ToastModule,
    ConfirmDialogModule,
    TrimOnBlurModule
  ],
  providers: [
    MessageService, ConfirmationService, MenuService,
   /* { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor,  multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpSuccessInterceptor, multi: true },*/
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
