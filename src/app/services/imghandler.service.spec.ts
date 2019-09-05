import { TestBed } from '@angular/core/testing';

import { ImghandlerService } from './imghandler.service';

describe('ImghandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImghandlerService = TestBed.get(ImghandlerService);
    expect(service).toBeTruthy();
  });
});
