import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolygonTraderWindowComponent } from '../windows/polygon-trader-window.component';

describe('PolygonTraderWindowComponent', () => {
  let component: PolygonTraderWindowComponent;
  let fixture: ComponentFixture<PolygonTraderWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PolygonTraderWindowComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PolygonTraderWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
