import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientConnectComponent } from '../client-connect.component';

describe('ClientConnectComponent', () => {
  let component: ClientConnectComponent;
  let fixture: ComponentFixture<ClientConnectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientConnectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientConnectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
