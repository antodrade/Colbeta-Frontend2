import { TestBed } from '@angular/core/testing';

import { PdfScannerService } from './pdf-scanner.service';

describe('PdfScannerService', () => {
  let service: PdfScannerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PdfScannerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
