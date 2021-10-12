import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateformComponent } from './certificateform.component';

describe('CertificateformComponent', () => {
  let component: CertificateformComponent;
  let fixture: ComponentFixture<CertificateformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertificateformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificateformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
