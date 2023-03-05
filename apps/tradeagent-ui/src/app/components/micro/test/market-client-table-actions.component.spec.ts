import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketClientTableActionsComponent } from '../market-client-table-actions.component';

describe('MarketClientActionsComponent', () => {
  let component: MarketClientTableActionsComponent;
  let fixture: ComponentFixture<MarketClientTableActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarketClientTableActionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MarketClientTableActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
