import {environment} from "../../../environments/environment";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {filter, map} from "rxjs/operators";

const urlBase = environment.apiServerURL + 'iva';

@Injectable({ providedIn: 'root' })
export class IvaService {

  constructor(private http: HttpClient) {}

  getIvas(): Observable<any> {
    let result: Observable<any> = this.http.get(`${urlBase}`);
    return result.pipe(
      filter(data => data && data.body),
      map(data => data.body));
  }
}
