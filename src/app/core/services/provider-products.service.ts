import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {ProductFullDto} from '../dtos/product-full.dto';
import {environment} from '../../../environments/environment';

const urlBase = environment.apiServerURL + 'provider-products';


@Injectable({
  providedIn: 'root'
})
export class ProviderProductsService {

  constructor(private http: HttpClient) {}

  getProviderProductsFilter(code: string, name: string, providerName: string,company: number): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    let params = new HttpParams();
    if (code) {
      params = params.set('code', code);
    }
    if (name) {
      params = params.set('name', name);
    }

    if (providerName) {
      params = params.set('provider', providerName);
    }

    if (company) {
      params = params.set('company', company);
    }
    let result: Observable<any> = this.http.get(`${urlBase}/filter`, {headers, params});
    return result.pipe(
      filter(data => data && data.body),
      map(data => data.body));
  }


}
