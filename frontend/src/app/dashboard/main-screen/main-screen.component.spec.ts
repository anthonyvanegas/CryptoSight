import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainscreenComponent } from './main-screen.component';

describe('MainscreenComponent', () => {
  let component: MainscreenComponent;
  let fixture: ComponentFixture<MainscreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainscreenComponent]
    });
    fixture = TestBed.createComponent(MainscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
