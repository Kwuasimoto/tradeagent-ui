import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketClientTraderActionsComponent } from '../market-client-trader-actions.component';

describe('MarketClientTraderActionsComponent', () => {
  let component: MarketClientTraderActionsComponent;
  let fixture: ComponentFixture<MarketClientTraderActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarketClientTraderActionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MarketClientTraderActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
