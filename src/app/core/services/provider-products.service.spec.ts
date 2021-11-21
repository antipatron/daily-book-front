import { TestBed } from '@angular/core/testing';

import { ProviderProductsService } from './provider-products.service';

describe('ProviderProductsService', () => {
  let service: ProviderProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProviderProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
