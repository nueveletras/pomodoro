import { Component, OnDestroy, OnInit } from '@angular/core';
import { TaskModel } from 'src/app/modules/task/shared/models/task.model';
import { MessageService } from "primeng/api";
import { Subscription } from 'rxjs';
import { TaskFacadeService } from '@task/services/task-facade.service';
import { DatePipe } from '@angular/common';
import { calculateTotalTime } from '@shared/utils/array-utils';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  providers: [MessageService, DatePipe]

})
export class RecordsComponent implements OnInit, OnDestroy {

  public tasks!: TaskModel[]
  public isLoading: boolean = false;
  public totalFocusTime: string = "";

  private subs: Subscription = new Subscription

  constructor(
    readonly taskFacade: TaskFacadeService,
    private messageService: MessageService,
    readonly datePipe: DatePipe

  ) {
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  ngOnInit(): void {

    const errors$ = this.taskFacade.getError().subscribe(
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Lo siento :(', detail: error });
      }
    )

    const loading$ = this.taskFacade.getLoading().subscribe(
      isLoading => this.isLoading = isLoading
    )

    const tasks$ = this.taskFacade.getAll().subscribe(
      (tasks: TaskModel[]) => {
        this.tasks = [...tasks]
      }
    )

    this.subs.add(errors$)
    this.subs.add(loading$)
    this.subs.add(tasks$)
  }

  onFilter($event: any){
    this.totalFocusTime = calculateTotalTime($event.filteredValue, "time", this.datePipe)
  }

}
