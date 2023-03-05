import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectPolygonComponent } from '../api-connect-forms/connect-polygon.component';

describe('ConnectPolygonComponent', () => {
  let component: ConnectPolygonComponent;
  let fixture: ComponentFixture<ConnectPolygonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConnectPolygonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConnectPolygonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
