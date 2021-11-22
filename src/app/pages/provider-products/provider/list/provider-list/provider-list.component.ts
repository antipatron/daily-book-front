import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Provider} from '../../../../../core/models/provider.model';
import {ProviderService} from '../../../../../core/services/provider.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationService} from "primeng/api";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-provider-list',
  templateUrl: './provider-list.component.html',
  styleUrls: ['./provider-list.component.scss']
})
export class ProviderListComponent implements OnInit, OnDestroy {

  private sub: Subscription = new Subscription();
  loading = false;
  providers: Array<Provider> = [];
  totalRecords = 0;
  providerName: any = null;
  sellerName: any = null;
  public cols: any[] | undefined;
  displayDialog= false;
  providerSelected = new Provider();

  constructor(private providerService: ProviderService,
              private router: Router, private route: ActivatedRoute,
              private confirmationService: ConfirmationService, private translateService: TranslateService) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'identifier', header: 'IDENTIFIER', width: '140px', sort: true, align: 'left' },
      { field: 'providerName', header: 'PROVIDER_NAME', width: '140px',sort: true, align: 'left' },
      { field: 'sellerName', header: 'SELLER_NAME', width: '140px',sort: true, align: 'right' },
      { field: 'phone1', header: 'PHONE_ONE', width: '140px',sort: true, align: 'right' },
      { field: 'actions', header: 'ACTIONS', width: '160px', align: 'left' },
    ];
    this.getProvidersList(this.providerName, this.sellerName, 1);
  }

  getProvidersList(providerName: string, sellerName: string, company: number): void {
    this.loading = true;
    this.sub.add(this.providerService.getProvidersFilter(providerName, sellerName, company).subscribe(data => {
      this.providers = data;
      this.totalRecords = data.length;
    }, error => {
      this.loading = false;
      console.error('Error: ' + error);
    }, () => {
      this.loading = false;
    }));
  }

  searchProviders(){
    this.getProvidersList(this.providerName, this.sellerName, 1)
  }

  createProvider() {
    this.router.navigate(['provider-products/admin/provider/create/']);
  }

  confirmDelete(provider: any){
    this.confirmationService.confirm({
      message: this.translateService.instant('PROVIDER.CONFIRMATION_MESSAGE_DELETE'),
      header: this.translateService.instant('PROVIDER.CONFIRMATION_DELETE'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteProvider(provider)
      },
      reject: () => {}
    });
  }

  deleteProvider(provider: any) {
    this.loading = true;
    this.sub.add(this.providerService.delete(provider.id).subscribe(data => {
      this.getProvidersList(this.providerName, this.sellerName, 1)
    }, error => {
      this.loading = false;
      console.error('Error: ' + error);
    }, () => {
      this.loading = false;
    }));
  }

  openDialog(provider: Provider) {
    this.displayDialog = true;
    this.providerSelected = provider;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
