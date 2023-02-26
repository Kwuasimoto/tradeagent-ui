import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutConsoleComponent } from './layout-console.component';

describe('LayoutConsoleComponent', () => {
  let component: LayoutConsoleComponent;
  let fixture: ComponentFixture<LayoutConsoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LayoutConsoleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
