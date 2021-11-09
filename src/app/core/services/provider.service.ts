import {environment} from "../../../environments/environment";
import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {filter, map} from "rxjs/operators";

const urlBase = environment.apiServerURL + 'provider';

@Injectable({ providedIn: 'root' })
export class ProviderService {

  constructor(private http: HttpClient) {}

  getProvidersFilter(providerName: string, sellerName: string, company: number): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    let params = new HttpParams();
    if (providerName) {
      params = params.set('name', providerName);
    }
    if (sellerName) {
      params = params.set('seller', sellerName);
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
