import {Injectable} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {LanguageService} from '../translator/language.service';

const errorKeys = [
  'required',
  'minlength',
  'maxlength',
  'pattern',
  'email',
  'min',
  'max',
];

@Injectable({
  providedIn: 'root',
})
export class ValidatorService {
  title: string | undefined;

  constructor(private translatorService: LanguageService) {}

  getValidationMessage(errorObject: any, fieldName: string): string {
    if (!errorObject) {
      return '';
    }
    let message = '';
    if (errorObject[errorKeys[0]]) {
      this.translatorService
        .instant('COMMON.VALIDATORS.REQUIRED')
        .subscribe(msg => {
          message = fieldName + ' ' + msg;
        });
    }

    if (errorObject[errorKeys[1]]) {
      this.translatorService
        .instant('COMMON.VALIDATORS.MIN_LEGTH')
        .subscribe(msg => {
          message = fieldName + ' ' + msg + ' ';
          this.translatorService
            .instant('COMMON.VALIDATORS.CHARACTERS')
            .subscribe(msg2 => {
              const minLength = errorObject[errorKeys[1]];
              message =
                message + ' ' + minLength['requiredLength'] + ' ' + msg2;
            });
        });
    }
    if (errorObject[errorKeys[2]]) {
      this.translatorService
        .instant('COMMON.VALIDATORS.MAX_LEGTH')
        .subscribe(msg => {
          message = fieldName + ' ' + msg + ' ';
          this.translatorService
            .instant('COMMON.VALIDATORS.CHARACTERS')
            .subscribe(msg2 => {
              const minLength = errorObject[errorKeys[2]];
              message =
                message + ' ' + minLength['requiredLength'] + ' ' + msg2;
            });
        });
    }
    if (
      errorObject[errorKeys[3]] !== undefined &&
      errorObject[errorKeys[3]]['requiredPattern'] !== undefined
    ) {
      this.translatorService
        .instant('COMMON.VALIDATORS.INVALID_PATTERN')
        .subscribe(msg => {
          message = fieldName + ' ' + msg;
        });
    }
    if (
      errorObject[errorKeys[4]] !== undefined &&
      errorObject[errorKeys[4]] === true
    ) {
      this.translatorService
        .instant('COMMON.VALIDATORS.INVALID_PATTERN')
        .subscribe(msg => {
          message = fieldName + ' ' + msg;
        });
    }
    if (errorObject[errorKeys[5]]) {
      this.translatorService.instant('COMMON.VALIDATORS.MIN').subscribe(msg => {
        const min = errorObject[errorKeys[5]];
        message = fieldName + ' ' + msg + ' ' + min['min'];
      });
    }
    if (errorObject[errorKeys[6]]) {
      this.translatorService.instant('COMMON.VALIDATORS.MAX').subscribe(msg => {
        const max = errorObject[errorKeys[6]];
        message = fieldName + ' ' + msg + ' ' + max['max'];
      });
    }
    return message;
  }

  isInvalid(control: AbstractControl): boolean {
    return (control.dirty || control.touched) && control.invalid;
  }
}
