import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketApiTableActionsComponent } from '../market-api-table-actions.component';

describe('MarketApiTableActionsComponent', () => {
  let component: MarketApiTableActionsComponent;
  let fixture: ComponentFixture<MarketApiTableActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarketApiTableActionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MarketApiTableActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
