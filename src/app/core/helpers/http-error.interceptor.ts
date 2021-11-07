import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import {throwError} from 'rxjs';
import {Router} from '@angular/router';
import {StorageService} from '../services/storage.service';
import {MessageService} from 'primeng/api';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private messageService: MessageService,
              private storageService: StorageService,
              private translateService: TranslateService,
              private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .catch((httpErrorResponse: HttpErrorResponse) => {
        const error = httpErrorResponse.error;
        let errorMessage;
        if (error.message === undefined || error.message === null) {
          errorMessage = 'default_message';
        } else {
          errorMessage = error.message;
        }

        if (httpErrorResponse.status === 409) {
          this.messageService.add({
            severity: 'error',
            summary: this.translateService.instant('GENERAL_MESSAGES.SUMMARY.ALERT'),
            detail: this.translateService.instant(`API_MESSAGES_RESPONSE.${errorMessage}`)
          });

        } else if (httpErrorResponse.status === 404) {
          this.messageService.add({
            severity: 'error',
            summary: this.translateService.instant('GENERAL_MESSAGES.SUMMARY.ALERT'),
            detail: this.translateService.instant(`API_MESSAGES_RESPONSE.${errorMessage}`)
          });

        } else if (httpErrorResponse.status === 400) {
          this.messageService.add({
            severity: 'error',
            summary: this.translateService.instant('GENERAL_MESSAGES.SUMMARY.ALERT'),
            detail: this.translateService.instant(`API_MESSAGES_RESPONSE.${errorMessage}`)
          });

        } else if (httpErrorResponse.status === 401) {
          this.router.navigate(['/pages/error'], {state: {value: 'The user does not have permissions on this application'}});
          this.storageService.logout();

        } else if (httpErrorResponse.status === 500) {
          this.router.navigate(['/pages/error'], {state: {value: errorMessage}});

        } else if (httpErrorResponse.status === 0) {
          this.router.navigate(['/pages/error'], {state: {value: 'Services are not available, contact the administrator'}});

        } else {
          return throwError(httpErrorResponse);
        }

        const result = new HttpResponse({
          body: {
            errorCode: httpErrorResponse.status,
            errorMessage,
            dateTime: new Date()
          }
        });
        return Observable.of(result);
      });
  }
}
