import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { dematerialize, filter, interval, map, materialize, mergeMap, NEVER, Notification, Observable, ObservableNotification, scan, share, skip, Subject, Subscription, switchMap, takeWhile, tap } from 'rxjs';
import { TaskModel } from 'src/app/core/models/task.model';
import { TaskFacadeService } from 'src/app/core/services/task-facade.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  taskNameValue: string = "";

  constructor(
    readonly taskFacade: TaskFacadeService
  ) { }
  paused: boolean = true;
  public displaySeconds = 0
  public displayMinutes = 25
  public startEventHot$ = new Subject()
  public countDownTimer = 59
  isPaused: boolean = false;
  isStoped: boolean = false
  countDown$: Observable<Notification<number> & ObservableNotification<number>> = new Observable
  subs: Subscription = new Subscription
  taskName = new FormControl('', Validators.required)
  isTaskAdded: boolean = false;

  ngOnInit(): void {
    this.setSubscription()
  }

  startTimer() {
    if (this.isStoped) {
      this.displaySeconds = 59;
      this.displayMinutes = 24
    }
    if (this.isStoped) {
      this.setSubscription()
    }
    this.isStoped = false
    this.startEventHot$.next(true)
  }

  setSubscription() {
    var cdt = this.countDownTimer
    const interval$ = interval(1000).pipe(
      tap(console.log),
      map(() => -1),
      share()
      )

    this.countDown$ = this.startEventHot$.pipe(
      tap(pause => {
        this.isPaused = !pause }),
      switchMap(start => start ? interval$ : NEVER),
      scan((acc, curr) => (curr ? curr + acc : curr), cdt),
      takeWhile(v => v >= 0),
      materialize(),
      tap(value => {
        console.log(value)
        if (value.kind == 'C' && !this.isStoped) {
          this.displaySeconds = this.countDownTimer
          this.displayMinutes--
          this.countDown$.pipe(dematerialize()).subscribe((value) => { this.displaySeconds = value as number })
          this.startEventHot$.next(true)
        }
      })
    )

    this.subs.add(this.countDown$.pipe(dematerialize()).subscribe((value) => { this.displaySeconds = value as number }))
  }

  stopTimer() {
    this.isStoped = true
    this.displaySeconds = 0
    this.displayMinutes = 25
    this.startEventHot$.next(false)
    this.subs.unsubscribe()
    this.subs = new Subscription
    this.isTaskAdded = false
  }

  addTask(){
    this.isTaskAdded = true
    this.taskNameValue = this.taskName.value as string
    let task:TaskModel = {
      id:"fsdfsdf",
      taskName: this.taskName.value as string,
      creationDate: new Date(),
      time: `${moment({ hour:0, minute:33, second: 12 }).format("HH:mm:ss")}`
    }
    this.taskFacade.create(task)
    this.taskName.reset()
  }

}
