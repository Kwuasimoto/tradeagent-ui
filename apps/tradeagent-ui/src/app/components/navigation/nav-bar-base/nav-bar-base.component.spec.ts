import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarBaseComponent } from './nav-bar-base.component';

describe('NavBarBaseComponent', () => {
  let component: NavBarBaseComponent;
  let fixture: ComponentFixture<NavBarBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavBarBaseComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavBarBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
