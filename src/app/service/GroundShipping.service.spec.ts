/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GroundShippingService } from './GroundShipping.service';

describe('Service: GroundShipping', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GroundShippingService]
    });
  });

  it('should ...', inject([GroundShippingService], (service: GroundShippingService) => {
    expect(service).toBeTruthy();
  }));
});
