import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiConfigFormComponent } from '../api-config-form.component';

describe('ApiConfigFormComponent', () => {
  let component: ApiConfigFormComponent;
  let fixture: ComponentFixture<ApiConfigFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApiConfigFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ApiConfigFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
