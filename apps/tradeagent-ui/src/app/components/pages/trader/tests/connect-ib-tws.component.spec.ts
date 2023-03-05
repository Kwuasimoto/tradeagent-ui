import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectIbTwsComponent } from '../client-connect-forms/connect-ib-tws.component';

describe('ConnectIbTwsComponent', () => {
  let component: ConnectIbTwsComponent;
  let fixture: ComponentFixture<ConnectIbTwsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConnectIbTwsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConnectIbTwsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
