import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {ValidatorService} from '../../../../shared/validator/validator.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProviderDto} from '../../../../core/dtos/provider.dto';
import {ProviderService} from '../../../../core/services/provider.service';

@Component({
  selector: 'app-provider-edit',
  templateUrl: './provider-edit.component.html',
  styleUrls: ['./provider-edit.component.scss']
})
export class ProviderEditComponent implements OnInit, OnDestroy {
  private sub: Subscription = new Subscription();
  edit = false;
  editDetailProduct = false;
  form: FormGroup;
  disableButtonSave = false;
  idProvider: any;
  providerSelected: any;



  constructor(private location: Location, private router: Router, private route: ActivatedRoute,
              private formBuilder: FormBuilder, public readonly validatorService: ValidatorService,
              private readonly providerService: ProviderService,
  ) {
    this.form = formBuilder.group({});

  }

  ngOnInit(): void {
    this.initializeForm();
    this.receiveDataToUpdate();
  }

  saveProvider(){
    this.disableButtonSave = true;
    let provider = this.buildForm(this.form.controls)
    if(this.edit){
      this.sub.add(this.providerService.update(provider).subscribe(data => {
        this.goBack();
      }, error => {
        console.error('Error: ' + error);
      },() => {
        this.disableButtonSave = false;
      }));
    }else{
      this.sub.add(this.providerService.save(provider).subscribe(data => {
        setTimeout( ()=>{
          this.goBack();
        },2000);

        }, error => {
        console.error('Error: ' + error);
      },() => {
        this.disableButtonSave = false;
      }));
    }

  }


  initializeForm(): void {
    this.form = this.formBuilder.group({
      id: [null],
      identifier: [null],
      address: [null],
      email: [null],
      providerName: [null, Validators.required],
      sellerName: [null, Validators.required],
      phone1: [null],
      phone2: [null],
      phone3: [null]
    });
  }

  receiveDataToUpdate(): void {
    this.route.params.subscribe((params) => {
      if(params){
        this.idProvider = params.idProvider;
      }
    });
    this.route.data.subscribe(d => {
      if (d.provider) {
        this.providerSelected = d.provider;
        this.edit = true;
        this.setForm();
      }
    });
  }

  setForm() {
    this.form.setValue({
      id: this.providerSelected?.id,
      identifier: this.providerSelected?.identifier,
      address: this.providerSelected?.address,
      email: this.providerSelected?.email,
      providerName: this.providerSelected?.providerName,
      sellerName: this.providerSelected?.sellerName,
      phone1: this.providerSelected?.phone1,
      phone2: this.providerSelected?.phone2,
      phone3: this.providerSelected?.phone3
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
    return<ProviderDto>{
      ...obj,
      companyId: company
    }
  }

  public getStringTranslateTitleProduct(): string {
    if (this.edit) {
      return 'PROVIDER.EDIT_PROVIDER';
    } else {
      return 'PROVIDER.CREATE_PROVIDER';
    }
  }

  public getStringTranslateTitleDetailProduct(): string {
    if (this.editDetailProduct) {
      return 'PROVIDER.DETAILS.EDIT_DETAIL';
    } else {
      return 'PROVIDER.DETAILS.ADD_DETAIL';
    }
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
