import { TestBed } from '@angular/core/testing';

import { ActionItemService } from './action-item.service';

describe('ActionItemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActionItemService = TestBed.get(ActionItemService);
    expect(service).toBeTruthy();
  });
});
