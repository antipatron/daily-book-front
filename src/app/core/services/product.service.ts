import {environment} from "../../../environments/environment";
import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {filter, map} from "rxjs/operators";
import {ProductFullDto} from "../dtos/product-full.dto";

const urlBase = environment.apiServerURL + 'product';

@Injectable({ providedIn: 'root' })
export class ProductService {

  constructor(private http: HttpClient) {}

  getProductsFilter(code: string, name: string, providerName: string,company: number): Observable<any> {
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

  getProductDetailsResolver(idProduct: number): Observable<any> {
    return this.http.get(`${urlBase}/by-id/${idProduct}`);
  }

  getProductDetails(idProduct: number): Observable<any>{
    let result: Observable<any> = this.http.get(`${urlBase}/by-id/${idProduct}`)
    return result.pipe(
      filter(data => data && data.body),
      map(data => data.body));
  }

  save(productFullDto: ProductFullDto): Observable<any>{
    let result: Observable<any> = this.http.post(`${urlBase}`, productFullDto);
    return result.pipe(
      filter(data => data && data.body),
      map(data => data.body));
  }

  update(productFullDto: ProductFullDto): Observable<any>{
    let result: Observable<any> = this.http.put(`${urlBase}`, productFullDto);
    return result.pipe(
      filter(data => data && data.body),
      map(data => data.body));
  }

  delete(idProduct: number): Observable<any>{
    let result: Observable<any> = this.http.delete(`${urlBase}/${idProduct}`);
    return result.pipe(
      filter(data => data && data.body),
      map(data => data.body));
  }
}
