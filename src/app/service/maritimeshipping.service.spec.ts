/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MaritimeshippingService } from './maritimeshipping.service';

describe('Service: Maritimeshipping', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MaritimeshippingService]
    });
  });

  it('should ...', inject([MaritimeshippingService], (service: MaritimeshippingService) => {
    expect(service).toBeTruthy();
  }));
});
