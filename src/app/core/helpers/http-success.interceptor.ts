import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import {MessageService} from 'primeng/api';
import {TranslateService} from '@ngx-translate/core';


@Injectable()
export class HttpSuccessInterceptor implements HttpInterceptor {


  constructor(private messageService: MessageService, private translateService: TranslateService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).do(
      event => {
        if (event instanceof HttpResponse) {
          if (event.status === 200) {
            if (event.body.message !== undefined && event.body.message !== 'null' && event.body.message !== null) {
              this.messageService.add({
                severity: 'success',
                summary: this.translateService.instant('GENERAL_MESSAGES.SUMMARY.SUCCESS'),
                detail: this.translateService.instant('GENERAL_MESSAGES.CREATED')
              });
            }
          } else if (event.status === 201) {
            this.messageService.add({
              severity: 'success',
              summary: this.translateService.instant('GENERAL_MESSAGES.SUMMARY.UPDATED'),
              detail: this.translateService.instant('GENERAL_MESSAGES.UPDATED')
            });
          } else if (event.status === 204) {
            this.messageService.add({
              severity: 'success',
              summary: this.translateService.instant('GENERAL_MESSAGES.SUMMARY.DELETED'),
              detail: this.translateService.instant('GENERAL_MESSAGES.DELETED')
            });
          }
        }
      }
    );
  }
}


