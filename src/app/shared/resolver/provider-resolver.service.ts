import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {ProviderService} from '../../core/services/provider.service';
import {ProviderDto} from '../../core/dtos/provider.dto';
import {of} from 'rxjs';
import {catchError, filter, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProviderResolverService implements Resolve<ProviderDto>{

  constructor(private providerService: ProviderService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {

    if (route && route.params && route.params.hasOwnProperty('idProvider')) {

      const idProvider = (route.params.idProvider as string);
      if (Number(idProvider)) {
        return this.providerService.getProviderResolver(Number(idProvider)).pipe(
          filter(data => data && data.body),
          map(data => data.body),
          catchError(() => {
              return of(undefined);
            }
          ));
      }
    } else {
      of(undefined);
    }
  }
}
