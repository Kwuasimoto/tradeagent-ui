import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraderWindowHeaderComponent } from '../headers/trader-window-header.component';

describe('TraderWindowHeaderComponent', () => {
  let component: TraderWindowHeaderComponent;
  let fixture: ComponentFixture<TraderWindowHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TraderWindowHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TraderWindowHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
