import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Product} from "../../../../core/models/product.model";
import {ProductService} from "../../../../core/services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProviderProductsService} from '../../../../core/services/provider-products.service';
import {ConfirmationService} from "primeng/api";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {

  private sub: Subscription = new Subscription();
  loading = false;
  products: Array<Product> = [];
  totalRecords = 0;
  name: any = null;
  code: any = null;
  providerName: any =  null;
  public cols: any[] = [];
  displayDialog= false;
  productSelected = new Product();
  closeOnEscape: boolean = true;

  constructor(private productService: ProductService, private providerProducts: ProviderProductsService,
              private router: Router, private route: ActivatedRoute,
              private confirmationService: ConfirmationService, private translateService: TranslateService) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'code', header: 'CODE', width: '140px', sort: true, align: 'left' },
      { field: 'name', header: 'NAME', width: '140px',sort: true, align: 'left' },
      { field: 'netPrice', header: 'NET_PRICE', width: '140px',sort: true, align: 'left' },
      { field: 'sellPrice', header: 'SELL_PRICE', width: '140px',sort: true, align: 'left' },
      { field: 'providerName', header: 'PROVIDER_NAME', width: '140px',sort: true, align: 'left' },
      { field: 'actions', header: 'ACTIONS', width: '160px', align: 'left' },
    ];
    this.getProductsList(this.code, this.name, this.providerName,1)
  }

  getProductsList(code: string, name: string, providerName: string, company: number): void {
    this.loading = true;
    this.sub.add(this.providerProducts.getProviderProductsFilter(code, name, providerName, company).subscribe(data => {
      this.products = data;
      this.totalRecords = data.length;
    }, error => {
      this.loading = false;
      console.error('Error: ' + error);
    }, () => {
      this.loading = false;
    }));
  }

  searchProducts(){
    this.getProductsList(this.code, this.name, this.providerName, 1)
  }

  createProduct() {
    this.router.navigate(['provider-products/admin/product/create/']);
  }

  editProduct(product: Product) {
    this.router.navigate([`provider-products/admin/product/edit/${product.id}`], { state: product });
  }

  confirmDelete(product: any){
    this.confirmationService.confirm({
      message: this.translateService.instant('PRODUCT.CONFIRMATION_MESSAGE_DELETE'),
      header: this.translateService.instant('PRODUCT.CONFIRMATION_DELETE'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteProduct(product)
      },
      reject: () => {}
    });
  }

  deleteProduct(product: any) {
    this.loading = true;
    this.sub.add(this.productService.delete(product.id).subscribe(data => {
      this.getProductsList(this.code, this.name, this.providerName,1)
    }, error => {
      this.loading = false;
      console.error('Error: ' + error);
    }, () => {
      this.loading = false;
    }));
  }

  openDialog(product: Product) {
    this.displayDialog = true;
    this.productSelected = product;
  }

  getValueIva(value: any){
    return Number(value)/100;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
