import {Component, OnDestroy, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ValidatorService} from "../../../../shared/validator/validator.service";
import {Product} from "../../../../core/models/product.model";
import {ProductFullDto} from "../../../../core/dtos/product-full.dto";
import {BrandService} from "../../../../core/services/brand.service";
import {IvaService} from "../../../../core/services/iva.service";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit, OnDestroy {
  private sub: Subscription = new Subscription();
  form: FormGroup;
  disableButtonSave = false;
  brands: any;
  brandSelected: any;
  ivas: any;
  ivaSelected: any;

  constructor(private location: Location, private router: Router, private formBuilder: FormBuilder,
              public readonly validatorService: ValidatorService, private readonly brandService: BrandService,
              private readonly ivaService: IvaService) {
    this.form = formBuilder.group({});
  }

  ngOnInit(): void {
    this.getBrands();
    this.getIvas();
    this.initializeForm();
  }

  getBrands(): void {
    this.sub.add(this.brandService.getBrands().subscribe(data => {
      this.brands = data;
    }, error => {
      console.error('Error: ' + error);
    }, () => {
    }));
  }

  getIvas(): void {
    this.sub.add(this.ivaService.getIvas().subscribe(data => {
      this.ivas = data;
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
      provider: [null]
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
    return<ProductFullDto>{
      ...obj,
      brandId: obj["brand"]?obj["brand"].id:null,
      ivaId: obj["iva"]?obj["iva"].id:null,
      companyId: company
    }
  }

  saveProduct(){
    /*this.disableButtonSave = true;*/
    let product = this.buildForm(this.form.controls)
    console.log(product)
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
