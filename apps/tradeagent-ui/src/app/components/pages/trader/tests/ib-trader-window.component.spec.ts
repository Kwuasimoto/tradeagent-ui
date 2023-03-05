import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IbTraderWindowComponent } from '../windows/ib-trader-window.component';

describe('IbTraderWindowComponent', () => {
  let component: IbTraderWindowComponent;
  let fixture: ComponentFixture<IbTraderWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IbTraderWindowComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IbTraderWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
