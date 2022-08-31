import { TestBed } from '@angular/core/testing';

import { MoneyTransferManagerService } from './money-transfer-manager.service';

describe('MoneyTransferManagerService', () => {
  let service: MoneyTransferManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoneyTransferManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
