import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferDestinationStepComponent } from './transfer-destination-step.component';

describe('TransferDestinationStepComponent', () => {
  let component: TransferDestinationStepComponent;
  let fixture: ComponentFixture<TransferDestinationStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferDestinationStepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferDestinationStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
