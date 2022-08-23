import { TaskModel } from "../models/task.model";

export interface CR<T> {
  getAll(): TaskModel[];
  create(entity: T): void;
  search(): void
}
