import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketApiActivitySignalComponent } from '../market-api-activity-signal.component';

describe('MarketApiActivitySignalComponent', () => {
  let component: MarketApiActivitySignalComponent;
  let fixture: ComponentFixture<MarketApiActivitySignalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarketApiActivitySignalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MarketApiActivitySignalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
