import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraderTabularMenuComponent } from '../trader-tabular-menu.component';

describe('ClientActivationTabularMenuComponent', () => {
  let component: TraderTabularMenuComponent;
  let fixture: ComponentFixture<TraderTabularMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TraderTabularMenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TraderTabularMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
