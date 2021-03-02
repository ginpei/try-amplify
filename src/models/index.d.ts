import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Work {
  readonly id: string;
  readonly taskID?: string;
  readonly description?: string;
  constructor(init: ModelInit<Work>);
  static copyOf(source: Work, mutator: (draft: MutableModel<Work>) => MutableModel<Work> | void): Work;
}

export declare class Task {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  readonly Works?: (Work | null)[];
  constructor(init: ModelInit<Task>);
  static copyOf(source: Task, mutator: (draft: MutableModel<Task>) => MutableModel<Task> | void): Task;
}