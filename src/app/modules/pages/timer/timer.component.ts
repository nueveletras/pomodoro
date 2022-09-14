import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  filter,
  interval,
  map,
  NEVER,
  Observable,
  Subject,
  Subscription,
  switchMap,
  takeWhile,
  tap
} from 'rxjs';
import { TaskModel } from 'src/app/modules/task/shared/models/task.model';
import { SettingModel } from 'src/app/modules/pomodoro/shared/models/setting.model';
import { UniqueIdGenerator } from 'src/app/shared/utils/unique-id-generator';
import { MessageService } from "primeng/api";
import { DatePipe } from '@angular/common';
import { AuthFacadeService } from '../../auth/shared/services/auth-facade.service';
import { TaskFacadeService } from '../../task/shared/services/task-facade.service';
import { SettingFacadeService } from '../../pomodoro/shared/services/setting-facade.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  providers: [MessageService, DatePipe]
})
export class TimerComponent implements OnInit, OnDestroy {

  taskNameValue: string = JSON.stringify(localStorage.getItem("currentTask")) || "";
  pomodorosCompleted: number = JSON.parse(localStorage.getItem("pomodorosCompleted") as string) || 0;
  isTaskAdded: boolean = JSON.parse(localStorage.getItem("isTaskAdded") as string) || false;
  pomodoros: { icon: string, task: string }[] = JSON.parse(localStorage.getItem("pomodoros") as string) || []

  timerValue!: number;
  userSettings: SettingModel = {
    focusTime: 0,
    longBreak: 0,
    break: 0,
    rounds: 0
  }
  userId: string | undefined;

  onCreate: boolean = false;
  isReset: boolean = true;
  isOnBreak: boolean = false;
  protected isPaused: boolean = false;
  private isStoped: boolean = true

  public displaySeconds = 0
  public displayMinutes: number = 0
  public startEventHot$ = new Subject()
  private countDown$: Observable<number> = new Observable
  private subs: Subscription = new Subscription
  private subsTimer: Subscription = new Subscription

  // taskForm = new FormControl('', [Validators.required, Validators.maxLength(15)])

  constructor(
    readonly taskFacade: TaskFacadeService,
    readonly settingFacade: SettingFacadeService,
    readonly authFacade: AuthFacadeService,
    readonly messageService: MessageService,
    readonly datePipe: DatePipe
  ) {
    this.authFacade.getCurrentUser().subscribe(
      (user) => {
        this.userId = user?.uid
      }
    )
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
    this.subsTimer.unsubscribe()
  }

  ngOnInit(): void {

    const localPomodoros = JSON.parse(localStorage.getItem("pomodoros") as string)
    this.pomodoros = localPomodoros ? localPomodoros : []

    const message$ = this.taskFacade.getMessage().pipe(
      filter(message => message !== "")
    ).subscribe(
      (message) => {
        this.messageService.add({ severity: 'success', summary: 'Excelente!!', detail: message });
        setTimeout(() => {
          this.onCreate = false
        }, 8000);

      }
    )

    const error$ = this.taskFacade.getError().subscribe(
      (message) => {
        this.messageService.add({ severity: 'error', summary: 'Lo siento :(', detail: message });
        setTimeout(() => {
          this.onCreate = false
        }, 8000);
      }
    )

    const setting$ = this.settingFacade.getSetting().pipe(
      filter(setting => !!setting)
    ).subscribe(
      (setting) => {
        this.userSettings = setting as SettingModel
        this.timerValue = (this.userSettings.focusTime * 60) - 1
        this.displayMinutes = this.userSettings?.focusTime
      }
    )

    this.subs.add(setting$)
    this.subs.add(message$)
    this.subs.add(error$)
  }

  /**
   * Metodo para verificar si el pomodoro ha terminado
   */
  finishedTime() {
    this.stopTimer()
    let sound = new Audio("../../assets/sounds/preview.mp3")
    sound.play()
  }

  /**
   * Metodo para configurar la suscripcion al temporizador
   */
  setSubscriptionTimer() {

    const interval$ = interval(1000)

    this.countDown$ = this.startEventHot$.pipe(
      tap(pause => {
        this.isPaused = !pause
      }),
      switchMap(start => start ? interval$ : NEVER),
      map(() => {
        if (!this.displaySeconds) {
          this.displaySeconds = 60
          this.displayMinutes--
        }
        this.timerValue--
        this.displaySeconds--
        return this.timerValue
      }),
      takeWhile(v => v >= 0),
    )

    this.subsTimer.add(this.countDown$.subscribe({
      complete: () => {
        if (this.isOnBreak) {
          this.isOnBreak = false
          this.isReset = true
          this.displaySeconds = 0
          this.displayMinutes = this.userSettings?.focusTime
          this.timerValue = (this.userSettings?.focusTime * 60) - 1
          let sound = new Audio("../../assets/sounds/finishedBreak.mp3")
          sound.play()
        } else {
          this.isReset = false
          this.addPomodoro()
          let sound = new Audio("../../assets/sounds/preview.mp3")
          sound.play()
          setTimeout(() => {
            this.isStoped = true
            this.isOnBreak = true
            this.displaySeconds = 0
            if (this.pomodorosCompleted == this.userSettings.rounds) {
              this.displayMinutes = this.userSettings.longBreak
              this.timerValue = (this.userSettings.longBreak * 60) - 1
              this.stopTimer()
            } else {
              this.displayMinutes = this.userSettings.break
              this.timerValue = (this.userSettings.break * 60) - 1
            }
            this.setSubscriptionTimer()
            this.startEventHot$.next(true)
          }, 8000);
        }

      }
    }))
  }

  addPomodoro() {
    this.onCreate = true
    let task: TaskModel = {
      id: UniqueIdGenerator.generate(),
      taskName: this.pomodoros[this.pomodorosCompleted].task,
      creationDate: new Date(),
      time: `${this.datePipe.transform(new Date(0, 0, 0, 0, this.userSettings?.focusTime, 0), 'HH:mm:ss')}`
    }
    this.taskFacade.create(this.userId as string, task)
    this.pomodoros.splice(this.pomodorosCompleted, 1, { icon: "pi pi-star-fill", task: task.taskName })
    localStorage.setItem("pomodoros", JSON.stringify(this.pomodoros))
    this.pomodorosCompleted++
    localStorage.setItem("pomodorosCompleted", this.pomodorosCompleted.toString())
  }

  /**
   * Metodo para iniciar el pomodoro
   */
  startTimer() {
    if (this.isStoped) {
      this.setSubscriptionTimer()
    }
    this.isStoped = false
    this.startEventHot$.next(true)
  }

  /**
   * Metodo para detener el pomodoro
   */
  stopTimer() {
    this.isStoped = true
    this.displaySeconds = 0
    this.displayMinutes = this.userSettings?.focusTime
    this.timerValue = (this.userSettings?.focusTime * 60) - 1
    this.isTaskAdded = false
    this.pomodoros = []
    this.pomodorosCompleted = 0
    localStorage.clear()
    this.subsTimer.unsubscribe()
    this.subsTimer = new Subscription
  }

  /**
   * Metodo para agregar una tarea al pomodoro
   */
  addTask(taskName: FormControl) {
    this.isTaskAdded = true
    this.taskNameValue = taskName.value as string

    for (let index = 0; index < this.userSettings.rounds; index++) {
      this.pomodoros.push({
        icon: "pi pi-star",
        task: `${taskName.value as string} - ronda ${index + 1}`
      })
    }

    localStorage.setItem("pomodoros", JSON.stringify(this.pomodoros))
    localStorage.setItem("pomodorosCompleted", this.pomodorosCompleted.toString())
    localStorage.setItem("currentTask", taskName.value as string)
    localStorage.setItem("isTaskAdded", JSON.stringify(this.isTaskAdded))
    taskName.reset()
  }

}
