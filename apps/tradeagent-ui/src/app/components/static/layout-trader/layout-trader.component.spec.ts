import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutTraderComponent } from './layout-trader.component';

describe('LayoutConsoleComponent', () => {
  let component: LayoutTraderComponent;
  let fixture: ComponentFixture<LayoutTraderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LayoutTraderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutTraderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
