import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferAmountStepComponent } from './transfer-amount-step.component';

describe('TransferAmountStepComponent', () => {
  let component: TransferAmountStepComponent;
  let fixture: ComponentFixture<TransferAmountStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferAmountStepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferAmountStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
