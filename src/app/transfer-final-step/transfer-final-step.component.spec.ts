import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferFinalStepComponent } from './transfer-final-step.component';

describe('TransferFinalStepComponent', () => {
  let component: TransferFinalStepComponent;
  let fixture: ComponentFixture<TransferFinalStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferFinalStepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferFinalStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
