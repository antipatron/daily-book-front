import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {ValidatorService} from "../../../../shared/validator/validator.service";
import {BrandService} from "../../../../core/services/brand.service";
import {IvaService} from "../../../../core/services/iva.service";
import {ProviderService} from "../../../../core/services/provider.service";
import {ProductService} from "../../../../core/services/product.service";
import {ProductDetailDto} from "../../../../core/dtos/product-detail.dto";
import {ProviderProductDto} from "../../../../core/dtos/provider-product.dto";

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit, OnDestroy {

  private sub: Subscription = new Subscription();
  form: FormGroup;
  disableButtonSave = false;
  brands: any[] = [];
  brandSelected: any;
  ivas: any[] = [];
  ivaSelected: any;
  providers: any[] = [];
  providerSelected: any;
  editar = false;
  idProduct: any
  productSelected: any

  constructor(private location: Location, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder,
              public readonly validatorService: ValidatorService, private readonly brandService: BrandService,
              private readonly ivaService: IvaService, private readonly providerService: ProviderService,
              private readonly productService: ProductService) {
    this.form = formBuilder.group({});
  }

  ngOnInit(): void {
    this.initializeForm();
    this.receiveDataToUpdate();
    this.getProviders();
    this.getBrands();
    this.getIvas();
  }

  getBrands(): void {
    this.sub.add(this.brandService.getBrands().subscribe(data => {
      this.brands = data;
      if(this.editar){
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
      if(this.editar){
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
      if(this.editar){
        this.providerSelected = this.providers.find(i => i.id == this.productSelected?.providerId);
        this.form.controls.provider.setValue(this.providerSelected);
      }
    }, error => {
      console.error('Error: ' + error);
    }, () => {
    }));
  }

  initializeForm(): void {
    this.form = this.formBuilder.group({
      id: [null],
      code: [null],
      name: [null, Validators.required],
      description: [null],
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
    let providerProductDto = new ProviderProductDto()
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

  saveProduct(){
    this.disableButtonSave = true;
    let product = this.buildForm(this.form.controls)
    this.sub.add(this.productService.save(product).subscribe(data => {
      this.goBack();
    }, error => {
      console.error('Error: ' + error);
    },() => {
      this.disableButtonSave = false;
    }));
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
        this.editar = true;
        this.setForm();
      }
    });
  }

  setForm() {
    this.form.setValue({
      id: this.productSelected?.id,
      code: this.productSelected?.code,
      name: this.productSelected?.name,
      description: this.productSelected?.description,
      netPrice: this.productSelected?.netPrice,
      sellPrice: this.productSelected?.sellPrice,
      brand: this.brandSelected,
      iva: this.ivaSelected,
      provider: this.providerSelected
    });
  }

  goBack(): void {
    if (window.history.length > 1) {
      this.location.back();
    } else {
      this.router.navigate(['/']);
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
