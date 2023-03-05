import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketClientActivityRouterComponent } from '../market-client-activity-router.component';

describe('MarketClientActivityRouterComponent', () => {
  let component: MarketClientActivityRouterComponent;
  let fixture: ComponentFixture<MarketClientActivityRouterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarketClientActivityRouterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MarketClientActivityRouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
