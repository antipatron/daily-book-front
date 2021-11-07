import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appAuthorize]'
})
export class AuthorizeDirective implements OnInit {

  @Input() permissions: string[] = [];
  @Input() roles: string[] = [];

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit(): void {
    if (this.permissions?.length) {
/*      const hasPermissionsPromise = this.authGuard.hasPermissions(this.permissions);
      hasPermissionsPromise.then(hasPermission => {
          if (!hasPermission) {
            this.renderer.removeChild(this.renderer, this.el.nativeElement);
          }
        }
      );*/
    }
    if (this.roles?.length) {
/*      const hasRolesPromise = this.authGuard.hasRoles(this.roles);
      hasRolesPromise.then(hasRole => {
          if (!hasRole) {
            this.renderer.removeChild(this.renderer, this.el.nativeElement);
          }
        }
      );*/
    }
  }
}
