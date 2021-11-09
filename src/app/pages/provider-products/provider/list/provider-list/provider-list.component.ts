import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {Provider} from '../../../../../core/models/provider.model';
import {ProviderService} from '../../../../../core/services/provider.service';

@Component({
  selector: 'app-provider-list',
  templateUrl: './provider-list.component.html',
  styleUrls: ['./provider-list.component.scss']
})
export class ProviderListComponent implements OnInit {

  private sub: Subscription = new Subscription();
  loading = false;
  providers: Array<Provider> = [];
  totalRecords = 0;
  providerName: any = null;
  sellerName: any = null;
  public cols: any[] | undefined;

  constructor(private providerService: ProviderService) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'identifier', header: 'IDENTIFIER', width: '140px', sort: true, align: 'left' },
      { field: 'address', header: 'ADDRESS', width: '140px',sort: true, align: 'left' },
      { field: 'email', header: 'EMAIL', width: '140px',sort: true, align: 'left' },
      { field: 'providerName', header: 'PROVIDER_NAME', width: '140px',sort: true, align: 'left' },
      { field: 'sellerName', header: 'SELLER_NAME', width: '140px',sort: true, align: 'right' },
      { field: 'phone1', header: 'PHONE_ONE', width: '140px',sort: true, align: 'right' },
      { field: 'phone2', header: 'PHONE_TWO', width: '140px',sort: true, align: 'right' },
      { field: 'phone3', header: 'PHONE_THREE', width: '140px',sort: true, align: 'right' },
      { field: 'actions', header: 'ACTIONS', width: '140px', align: 'left' },
    ];
    this.getProvidersList(this.providerName, this.sellerName, 1);
  }

  getProvidersList(providerName: string, sellerName: string, company: number): void {
    this.loading = true;
    this.sub.add(this.providerService.getProvidersFilter(providerName, sellerName, company).subscribe(data => {
      this.providers = data;
      this.totalRecords = data.length;
      alert(JSON.stringify(this.providers))
    }, error => {
      this.loading = false;
      console.error('Error: ' + error);
    }, () => {
      this.loading = false;
    }));
  }

  searchProviders(){
    console.log(this.providerName)
    console.log(this.sellerName)
    this.getProvidersList(this.providerName, this.sellerName, 1)
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
