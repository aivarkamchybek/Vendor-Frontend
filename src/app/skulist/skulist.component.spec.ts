import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkulistComponent } from './skulist.component';

describe('SkulistComponent', () => {
  let component: SkulistComponent;
  let fixture: ComponentFixture<SkulistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SkulistComponent]
    });
    fixture = TestBed.createComponent(SkulistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
