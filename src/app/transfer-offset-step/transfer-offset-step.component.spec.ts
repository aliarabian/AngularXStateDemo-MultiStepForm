import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferOffsetStepComponent } from './transfer-offset-step.component';

describe('TransferOffsetStepComponent', () => {
  let component: TransferOffsetStepComponent;
  let fixture: ComponentFixture<TransferOffsetStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferOffsetStepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferOffsetStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
