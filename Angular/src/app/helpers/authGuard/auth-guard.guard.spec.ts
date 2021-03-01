import { TestBed } from '@angular/core/testing';

import { CanActivateRoute } from './can-activate-route.guard';

describe('AuthGuardGuard', () => {
  let guard: CanActivateRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanActivateRoute);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
