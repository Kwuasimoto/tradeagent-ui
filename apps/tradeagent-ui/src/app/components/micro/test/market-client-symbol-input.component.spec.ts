import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketClientSymbolInputComponent } from '../market-client-symbol-input.component';

describe('MarketClientSymbolInputComponent', () => {
  let component: MarketClientSymbolInputComponent;
  let fixture: ComponentFixture<MarketClientSymbolInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarketClientSymbolInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MarketClientSymbolInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
