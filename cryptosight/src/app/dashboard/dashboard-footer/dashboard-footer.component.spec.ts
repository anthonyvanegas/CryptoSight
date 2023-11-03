import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardFooterComponent } from './dashboard-footer.component';

describe('DashboardFooterComponent', () => {
  let component: DashboardFooterComponent;
  let fixture: ComponentFixture<DashboardFooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardFooterComponent]
    });
    fixture = TestBed.createComponent(DashboardFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
