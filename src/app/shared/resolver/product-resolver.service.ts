import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {ProductFullDto} from "../../core/dtos/product-full.dto";
import {ProductService} from "../../core/services/product.service";
import {of} from "rxjs";
import {catchError, filter, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductResolverService implements Resolve<ProductFullDto> {

  constructor(private productService: ProductService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    if (route && route.params && route.params.hasOwnProperty('idProduct')) {
      const idProduct = (route.params.idProduct as string);
      if (Number(idProduct)) {
        return this.productService.getProductDetailsResolver(Number(idProduct)).pipe(
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
