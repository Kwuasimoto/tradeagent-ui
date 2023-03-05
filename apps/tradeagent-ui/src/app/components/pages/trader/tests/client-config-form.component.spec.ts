import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientConfigFormComponent } from '../client-config-form.component';

describe('ClientConnectFormComponent', () => {
  let component: ClientConfigFormComponent;
  let fixture: ComponentFixture<ClientConfigFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientConfigFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientConfigFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
