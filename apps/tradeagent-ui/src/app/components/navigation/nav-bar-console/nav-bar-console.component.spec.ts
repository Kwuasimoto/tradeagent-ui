import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarConsoleComponent } from './nav-bar-console.component';

describe('NavBarConsoleComponent', () => {
  let component: NavBarConsoleComponent;
  let fixture: ComponentFixture<NavBarConsoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavBarConsoleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavBarConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
