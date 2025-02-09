import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelSkuPredictionComponent } from './excel-sku-prediction.component';

describe('ExcelSkuPredictionComponent', () => {
  let component: ExcelSkuPredictionComponent;
  let fixture: ComponentFixture<ExcelSkuPredictionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExcelSkuPredictionComponent]
    });
    fixture = TestBed.createComponent(ExcelSkuPredictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
