import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraderWindowFactoryComponent } from '../windows/trader-window-factory.component';

describe('TraderWindowFactoryComponent', () => {
  let component: TraderWindowFactoryComponent;
  let fixture: ComponentFixture<TraderWindowFactoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TraderWindowFactoryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TraderWindowFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
