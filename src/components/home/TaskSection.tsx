import { DataStore } from "aws-amplify";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { logError } from "../../misc/error";
import { Task } from "../../models";
import "./TaskSection.css";

type TaskCallback = (task: Task) => void;

export const TaskSection: React.FC = () => {
  const [saving, setSaving] = useState(false);
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [newTask, setNewTask] = useState(new Task({ name: "" }));

  const onFormChange: TaskCallback = (newNewTask) => {
    setNewTask(newNewTask);
  };

  const onFormSubmit: TaskCallback = async (newNewTask) => {
    try {
      setSaving(true);
      await DataStore.save(newNewTask);
      setNewTask(new Task({ name: "" }));
    } catch (error) {
      logError(error);
    } finally {
      setSaving(false);
    }
  };

  const onTaskDelete: TaskCallback = async (task) => {
    try {
      setSaving(true);
      await DataStore.delete(task);
    } catch (error) {
      logError(error);
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    DataStore.query(Task).then((newTasks) => {
      setTasks(newTasks);
    });

    DataStore.observe(Task).subscribe((message) => {
      DataStore.query(Task).then((newTasks) => {
        setTasks(newTasks);
      });
    });
  }, []);

  return (
    <section className="TaskSection">
      <h1>Tasks</h1>
      <TaskForm
        disabled={saving}
        onChange={onFormChange}
        onSubmit={onFormSubmit}
        task={newTask}
      />
      {tasks === null && "…"}
      {tasks &&
        (tasks.length > 0 ? (
          <div className="ui-box">
            {tasks.map((task) => (
              <TaskItem key={task.id} onDelete={onTaskDelete} task={task} />
            ))}
          </div>
        ) : (
          <p>
            <small>(No tasks)</small>
          </p>
        ))}
    </section>
  );
};

const TaskForm = ({
  disabled,
  onChange,
  onSubmit,
  task,
}: {
  disabled: boolean;
  onChange: TaskCallback;
  onSubmit: TaskCallback;
  task: Task;
}) => {
  const onValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    if (name === "name") {
      onChange(new Task({ ...task, name: value }));
    }
  };

  const onFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(task);
  };

  return (
    <form className="TaskForm" onSubmit={onFormSubmit}>
      <p>
        <label>
          Name:{" "}
          <input
            disabled={disabled}
            name="name"
            onChange={onValueChange}
            type="text"
            value={task.name}
          />
        </label>
      </p>
      <p>
        <button disabled={disabled}>OK</button>
      </p>
    </form>
  );
};

const TaskItem = ({
  onDelete,
  task,
}: {
  onDelete: TaskCallback;
  task: Task;
}) => {
  return (
    <div className="TaskSection-TaskItem">
      {task.name}
      <button
        className="ui-pullRight"
        onClick={() => onDelete(task)}
        title={`Delete "${task.name}"`}
      >
        🗑️
      </button>
    </div>
  );
};
