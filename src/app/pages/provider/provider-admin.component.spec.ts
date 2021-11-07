import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderAdminComponent } from './provider-admin.component';

describe('ProviderAdminComponent', () => {
  let component: ProviderAdminComponent;
  let fixture: ComponentFixture<ProviderAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviderAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
