import { TestBed } from '@angular/core/testing';

import { SettingFacadeService } from './setting-facade.service';

describe('SettingFacadeService', () => {
  let service: SettingFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
