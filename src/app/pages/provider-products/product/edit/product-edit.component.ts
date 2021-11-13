import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ValidatorService} from "../../../../shared/validator/validator.service";
import {BrandService} from "../../../../core/services/brand.service";
import {IvaService} from "../../../../core/services/iva.service";
import {ProviderService} from "../../../../core/services/provider.service";
import {ProductService} from "../../../../core/services/product.service";
import {ProviderProductsDto} from "../../../../core/dtos/provider-products.dto";
import {ProductDetailDto} from "../../../../core/dtos/product-detail.dto";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit, OnDestroy {
  private sub: Subscription = new Subscription();
  form: FormGroup;
  disableButtonSave = false;
  productDetails: ProviderProductsDto[] = [];
  brands: any[] = [];
  brandSelected: any;
  ivas: any[] = [];
  ivaSelected: any;
  providers: any[] = [];
  providerSelected: any;
  edit = false;
  editDetailProduct = false;
  idProduct: any
  productSelected: any
  loading = false;
  totalRecords = 0;
  public cols: any[] | undefined;
  showFormDetail = true;

  constructor(private location: Location, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder,
              public readonly validatorService: ValidatorService, private readonly brandService: BrandService,
              private readonly ivaService: IvaService, private readonly providerService: ProviderService,
              private readonly productService: ProductService) {
    this.form = formBuilder.group({});
  }

  ngOnInit(): void {
    this.cols = [
      { field: 'provider', header: 'PROVIDER', width: '140px', sort: true, align: 'left' },
      { field: 'netPrice', header: 'NET_PRICE', width: '140px',sort: true, align: 'left' },
      { field: 'sellPrice', header: 'SELL_PRICE', width: '140px',sort: true, align: 'left' },
      { field: 'actions', header: 'ACTIONS', width: '140px', align: 'left' },
    ];
    this.initializeForm();
    this.receiveDataToUpdate();
    this.getProviders();
    this.getBrands();
    this.getIvas();
  }

  receiveDataToUpdate(): void {
    this.route.params.subscribe((params) => {
      if(params){
        this.idProduct = params.idProduct;
      }
    });
    this.route.data.subscribe(d => {
      if (d.product) {
        this.productSelected = d.product;
        this.productDetails = d.product.productDetail;
        this.edit = true;
        this.showFormDetail = false
        this.setForm();
      }
    });
  }

  getBrands(): void {
    this.sub.add(this.brandService.getBrands().subscribe(data => {
      this.brands = data;
      if(this.edit){
        this.brandSelected = this.brands.find(i => i.id == this.productSelected?.brandId);
        this.form.controls.brand.setValue(this.brandSelected);
      }
    }, error => {
      console.error('Error: ' + error);
    }, () => {
    }));
  }

  getIvas(): void {
    this.sub.add(this.ivaService.getIvas().subscribe(data => {
      this.ivas = data;
      if(this.edit){
        this.ivaSelected = this.ivas.find(i => i.id == this.productSelected?.ivaId);
        this.form.controls.iva.setValue(this.ivaSelected);
      }
    }, error => {
      console.error('Error: ' + error);
    }, () => {
    }));
  }

  getProviders(): void {
    this.sub.add(this.providerService.getProvidersFilter('', '', 1).subscribe(data => {
      this.providers = data;
      if(this.edit){
        this.providerSelected = this.providers.find(i => i.id == this.productSelected?.productDetail?.providerId);
        this.form.controls.provider.setValue(this.providerSelected);
      }
    }, error => {
      console.error('Error: ' + error);
    }, () => {
    }));
  }

  getProviderNameById(id: number){
    return this.providers.find(i => i.id == id)?.providerName;
  }

  initializeForm(): void {
    this.form = this.formBuilder.group({
      id: [null],
      code: [null],
      name: [null, Validators.required],
      description: [null],
      idProductDetail: [null],
      netPrice: [null],
      sellPrice: [null],
      brand: [null],
      iva: [null],
      provider: [null, Validators.required]
    });
  }

  buildForm(controls: any){
    let obj: any = {};
    for (const pro in controls) {
      if (controls[pro] && controls[pro].value != undefined) {
        obj[pro] = controls[pro].value;
      }
    }
    let company = 1
    let providerProductDto = new ProviderProductsDto()
    providerProductDto.id = obj["idProductDetail"]?obj["idProductDetail"]:null;
    providerProductDto.providerId = obj["provider"]?obj["provider"].id:null;
    providerProductDto.netPrice = obj["netPrice"]?obj["netPrice"]:null;
    providerProductDto.sellPrice = obj["sellPrice"]?obj["sellPrice"]:null;
    providerProductDto.timestamp = new Date()

    return<ProductDetailDto>{
      ...obj,
      brandId: obj["brand"]?obj["brand"].id:null,
      ivaId: obj["iva"]?obj["iva"].id:null,
      productDetail: providerProductDto,
      companyId: company
    }
  }

  getProductDetails(idProduct: number){
    this.sub.add(this.productService.getProductDetails(idProduct).subscribe(data => {
      this.productSelected = data
      this.productDetails = data.productDetail
      this.edit = true;
      this.showFormDetail = false
      this.setForm();
      this.getProviders();
      this.getBrands();
      this.getIvas();
    }, error => {
      console.error('Error: ' + error);
    },() => {
      this.disableButtonSave = false;
    }));
  }

  saveProduct(){
    this.disableButtonSave = true;
    let product = this.buildForm(this.form.controls)
    if(this.edit){
      this.sub.add(this.productService.update(product).subscribe(data => {
        this.getProductDetails(data.id)
      }, error => {
        console.error('Error: ' + error);
      },() => {
        this.disableButtonSave = false;
      }));
    }else{
      this.sub.add(this.productService.save(product).subscribe(data => {
        this.getProductDetails(data.id)
      }, error => {
        console.error('Error: ' + error);
      },() => {
        this.disableButtonSave = false;
      }));
    }
  }

  setForm() {
    this.form.setValue({
      id: this.productSelected?.id,
      code: this.productSelected?.code,
      name: this.productSelected?.name,
      description: this.productSelected?.description,
      idProductDetail: null,
      netPrice: null,
      sellPrice: null,
      brand: this.brandSelected?this.brandSelected:null,
      iva: this.ivaSelected?this.ivaSelected:null,
      provider: this.providerSelected?this.providerSelected:null
    });
  }

  addDetail() {
    this.showFormDetail = true
    this.editDetailProduct = false;
    this.form.controls.idProductDetail.setValue(null);
    this.form.controls.netPrice.setValue(null);
    this.form.controls.sellPrice.setValue(null);
    this.form.controls.provider.setValue(null);
  }

  editDetail(productDetail: any) {
    this.showFormDetail = true;
    this.editDetailProduct = true;
    this.form.controls.idProductDetail.setValue(productDetail?.id);
    this.form.controls.netPrice.setValue(productDetail?.netPrice);
    this.form.controls.sellPrice.setValue(productDetail?.sellPrice);
    this.providerSelected = this.providers.find(i => i.id == productDetail?.providerId);
    this.form.controls.provider.setValue(this.providerSelected);
  }

  goBack(): void {
    if (window.history.length > 1) {
      this.location.back();
    } else {
      this.router.navigate(['/']);
    }
  }

  public getStringTranslateTitleProduct() {
    if (this.edit) {
      return 'PRODUCT.EDIT_PRODUCT';
    } else {
      return 'PRODUCT.CREATE_PRODUCT';
    }
  }

  public getStringTranslateTitleDetailProduct() {
    if (this.editDetailProduct) {
      return 'PRODUCT.DETAILS.EDIT_DETAIL';
    } else {
      return 'PRODUCT.DETAILS.ADD_DETAIL';
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
