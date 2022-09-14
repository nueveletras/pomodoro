import { Component, OnDestroy, OnInit } from '@angular/core';
import { TaskModel } from 'src/app/modules/task/shared/models/task.model';
import { MessageService } from "primeng/api";
import { Subscription } from 'rxjs';
import { TaskFacadeService } from '@task/services/task-facade.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  providers: [MessageService]
})
export class RecordsComponent implements OnInit, OnDestroy {

  tasks!: TaskModel[]
  userId: string | undefined;
  isLoading: boolean = false;
  private subs: Subscription = new Subscription

  constructor(
    readonly taskFacade: TaskFacadeService,
    private messageService: MessageService

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

}
