import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit, OnDestroy {
  private sub: Subscription = new Subscription();

  constructor() {}

  ngOnInit(): void {

  }


  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
