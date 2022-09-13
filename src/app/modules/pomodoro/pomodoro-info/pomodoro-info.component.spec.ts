import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PomodoroInfoComponent } from './pomodoro-info.component';

describe('PomodoroInfoComponent', () => {
  let component: PomodoroInfoComponent;
  let fixture: ComponentFixture<PomodoroInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PomodoroInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PomodoroInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
