import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Data, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {StorageService} from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private router: Router, private storageService: StorageService) {
  }

  canActivate(next: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkRoles(next.data);
  }

  checkRoles(data: Data): any {
    const user = this.storageService.get('loggedUser');
    const roles = data ? data.roles : undefined;
    if (!user || !user.permissions) {
      this.goToHomePage();
      return false;
    }
    if (roles) {
      for (const rol of roles) {
        if (user.permissions.indexOf(rol) > -1) {
          return true;
        }
      }
    } else {
      this.goToHomePage();
      return false;
    }
    this.goToHomePage();
    return false;
  }

  private goToHomePage(): void {
    this.router.navigate(['dashboard']);
  }
}
