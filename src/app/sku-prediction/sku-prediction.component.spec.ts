import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkuPredictionComponent } from './sku-prediction.component';

describe('SkuPredictionComponent', () => {
  let component: SkuPredictionComponent;
  let fixture: ComponentFixture<SkuPredictionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SkuPredictionComponent]
    });
    fixture = TestBed.createComponent(SkuPredictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
