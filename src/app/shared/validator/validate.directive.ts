import {Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2,} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ValidatorService} from "./validator.service";

@Directive({
  selector: '[validate]',
})
export class ValidateDirective implements OnInit, OnDestroy {
  @Input() form: FormGroup = new FormGroup({});
  @Input() controlName: any;
  @Input() matchControl: any;
  @Input() label: any;
  isInvalid = false;

  constructor(
    private _validatorService: ValidatorService,
    private _el: ElementRef,
    private _render: Renderer2,
  ) {}

  ngOnInit() {
    const validateMessage: string = this._validatorService.getValidationMessage(
      this.form.controls[this.controlName].errors,
      this.label,
    );
    const textElement: any = this._render.createText(validateMessage);
    const validateElement = this._render.createElement('small');
    this._render.appendChild(validateElement, textElement);
    this._render.appendChild(this._el.nativeElement, validateElement);
    this._render.addClass(this._el.nativeElement, 'text-danger');
  }

  ngOnDestroy() {}
}
