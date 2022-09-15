import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  filter,
  interval,
  map,
  NEVER,
  Subject,
  Subscription,
  switchMap,
  takeWhile
} from 'rxjs';
import { TaskModel } from 'src/app/modules/task/shared/models/task.model';
import { SettingModel } from 'src/app/modules/pomodoro/shared/models/setting.model';
import { UniqueIdGenerator } from 'src/app/shared/utils/unique-id-generator';
import { MessageService, ConfirmationService } from "primeng/api";
import { DatePipe } from '@angular/common';
import { AuthFacadeService } from '../../auth/shared/services/auth-facade.service';
import { TaskFacadeService } from '../../task/shared/services/task-facade.service';
import { SettingFacadeService } from '../../pomodoro/shared/services/setting-facade.service';
import { timer } from './timer.enums';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  providers: [MessageService, DatePipe, ConfirmationService]
})
export class TimerComponent implements OnInit, OnDestroy {

  //#region ======================== VARIABLES PUBLICAS =====================================
  public pomodoros: { icon: string, task: string }[] = JSON.parse(localStorage.getItem("pomodoros") as string) || []
  public pomodorosCompleted: number = JSON.parse(localStorage.getItem("pomodorosCompleted") as string) || 0;
  public isTaskAdded: boolean = JSON.parse(localStorage.getItem("isTaskAdded") as string) || false;
  public taskNameValue: string = JSON.stringify(localStorage.getItem("currentTask")) || "";

  public displaySeconds = 0
  public displayMinutes: number = 0

  public isOnBreak: boolean = false;
  public isOnCreate: boolean = false;
  public isReset: boolean = true;
  //#endregion ====================== VARIABLES PUBLICAS ====================================

  //#region ======================== VARIABLLES PRIVADAS =====================================
  private timerValue!: number;
  private userSettings: SettingModel = {
    focusTime: 0,
    longBreak: 0,
    break: 0,
    rounds: 0
  }
  private userId: string | undefined;
  private isStoped: boolean = true
  private startEventHot$ = new Subject()
  private subs: Subscription = new Subscription
  private subsTimer: Subscription = new Subscription
  //#endregion ====================== VARIABLES PRIVADAS ====================================

  constructor(
    readonly taskFacade: TaskFacadeService,
    readonly settingFacade: SettingFacadeService,
    readonly authFacade: AuthFacadeService,
    readonly messageService: MessageService,
    readonly datePipe: DatePipe,
    readonly confirmationService: ConfirmationService
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
    this.setSubscriptions()
  }
  //#region ========================== ACCIONES DE BOTONES =============================
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
   * Metodo para pausar el pomodoro
   */
  pauseTimer() {
    this.startEventHot$.next(false)
  }

  /**
   * Funcionalidad para pasar al siguiente pomodoro
   */
  nextPomodoro = () => {
    this.subsTimer.unsubscribe()
    this.subsTimer = new Subscription
    this.finishPomodoro()
  }

  /**
   * Metodo para instanciar los valores necesarios que termina los pomodoros
   * asociados a la tarea
   */
  stopTimer = () => {
    this.isStoped = true
    this.displaySeconds = 0
    this.displayMinutes = this.userSettings?.focusTime
    this.timerValue = (this.userSettings?.focusTime * 60) - 1
    this.isTaskAdded = false
    this.pomodoros = []
    this.pomodorosCompleted = 0
    localStorage.clear()
    this.subsTimer && this.subsTimer.unsubscribe()
    this.subsTimer = new Subscription
  }

  /**
   * Metodo que setea los parametros de la modal de confirmación
   * @param origin de donde viene la accion
   */
  confirmationAction(origin: string) {
    switch (origin) {
      case timer.NEXT_POMODORO_ACTION:
        this.setConfirmation("¿Estas seguro de terminar este pomodoro y tomar el siguiente descanso?", this.nextPomodoro)
        break;
      case timer.STOP_TIMER_ACTION:
        this.setConfirmation("Esta acción eliminará los pomodoros faltantes ¿Estas seguro de detener y configurar otra tarea?", this.stopTimer)
        break;

      default:
        break;
    }
  }
  //#endregion ========================== ACCIONES DE BOTONES =============================

  //#region ============================= CRUDS ===========================================
  /**
   * Metodo crear tareas terminadas una vez se completa o termina un pomodoro
   */
  createTask() {
    this.isOnCreate = true
    let task: TaskModel = {
      id: UniqueIdGenerator.generate(),
      taskName: this.pomodoros[this.pomodorosCompleted].task,
      creationDate: new Date(),
      time: `${this.datePipe.transform(new Date(0, 0, 0, 0, this.userSettings?.focusTime, 0), 'HH:mm:ss')}`
    }
    this.taskFacade.create(this.userId as string, task)
    this.pomodoros.splice(this.pomodorosCompleted, 1, { icon: "pi pi-star-fill", task: task.taskName })
    this.pomodorosCompleted++
    localStorage.setItem("pomodoros", JSON.stringify(this.pomodoros))
    localStorage.setItem("pomodorosCompleted", this.pomodorosCompleted.toString())
  }

  /**
   * Metodo para agregar los pomodoros desprendidos de la tarea creada
   */
  addPomodoro(taskName: FormControl) {
    this.isTaskAdded = true
    this.taskNameValue = taskName.value

    for (let index = 0; index < this.userSettings.rounds; index++) {
      this.pomodoros.push({
        icon: "pi pi-star",
        task: `${taskName.value} - ronda ${index + 1}`
      })
    }
    localStorage.setItem("pomodoros", JSON.stringify(this.pomodoros))
    localStorage.setItem("pomodorosCompleted", this.pomodorosCompleted.toString())
    localStorage.setItem("currentTask", taskName.value as string)
    localStorage.setItem("isTaskAdded", JSON.stringify(this.isTaskAdded))
    taskName.reset()
  }
  //#endregion ========================== CRUDS =============================================

  //#region ========================= PARAMTERIZACIONES =====================================
  /**
   * Metodo para instanciar las suscripciones del componente
   */
  setSubscriptions() {
    // Suscripcion para mensajes de SUCCESS
    const message$ = this.taskFacade.getMessage().pipe(
      filter(message => message !== "")
    ).subscribe(
      (message) => {
        console.log(message);

        this.messageService.add({ severity: 'success', summary: 'Excelente!!', detail: message });
        setTimeout(() => {
          this.isOnCreate = false
        }, 8000);

      }
    )
    // Suscripcion para mensajes de ERROR
    const error$ = this.taskFacade.getError().subscribe(
      (message) => {
        this.messageService.add({ severity: 'error', summary: 'Lo siento :(', detail: message });
        setTimeout(() => {
          this.isOnCreate = false
        }, 8000);
      }
    )
    // Suscripcion para configuracion de pomodoros
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
   * Metodo para configurar la suscripcion al temporizador
   */
  setSubscriptionTimer() {
    const interval$ = interval(1000)

    const countDown$ = this.startEventHot$.pipe(
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

    this.subsTimer.add(
      countDown$.subscribe({
        complete: () => {
          if (this.isOnBreak) {
            this.finishBreak()
          } else {
            this.finishPomodoro()
          }
        }
      }))
  }

  /**
   * Metodo para configurar el mensaje y la funcionalidad de la modal de confirmación
   * @param message Mensaje que se mostrará en la modal de confirmación
   * @param action funcion que se llamará para ejecutar las acciones
   */
  setConfirmation(message: string, action: Function) {
    this.startEventHot$.next(false)
    this.confirmationService.confirm({
      message: message,
      accept: action,
      reject: () => this.startEventHot$.next(true)
    });
  }

  /**
   * Metodo para indicar acciones si el pomodoro ha terminado
   */
  finishPomodoro() {
    this.setSound(timer.POMODORO_ENDING_SOUND_SOURCE)
    this.isReset = false
    this.createTask()
    setTimeout(() => {
      this.isStoped = true
      this.isOnBreak = true
      this.displaySeconds = 0
      this.setNewBreak()
    }, 8000);
  }

  /**
   * Metodo para asignar los valores del siguiente temporizador de pausa
   * segun configuraciones de pomodoro de usuario
   */
  setNewBreak() {
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
  }

  /**
   * Metodo para asignar los valores que terminan un descanso
   */
  finishBreak() {
    this.isReset = true
    this.isOnBreak = false
    this.displaySeconds = 0
    this.displayMinutes = this.userSettings?.focusTime
    this.timerValue = (this.userSettings?.focusTime * 60) - 1
    this.setSound(timer.BRAKE_ENDING_SOUND_SOURCE)
  }

  /**
   * Metodo para reproducir sonido
   * @param src path/url de la ubicacion del audio
   */
  setSound(src: string) {
    let sound = new Audio(src)
    sound.play()
  }
  //#endregion ====================== PARAMTERIZACIONES =====================================
}
