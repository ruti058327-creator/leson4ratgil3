import { useState } from "react";
import TodoForm from "../TodoForm/TodoForm.jsx";
import TodoItem from "../TodoItem/TodoItem.jsx";
import "./TodoList.css";

const initialTasks = [
  { id: Date.now(), title: "לסיים את תרגיל React", isDone: false },
  { id: Date.now() + 1, title: "לקרוא פרק בספר", isDone: true },
  { id: Date.now() + 2, title: "לצאת להליכה", isDone: false },
];

export default function TodoList() {
  const [tasks, setTasks] = useState(initialTasks);
  const [taskToEdit, setTaskToEdit] = useState(null);

  function addTask(title) {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      return;
    }

    setTasks((currentTasks) => {
      let id = Date.now();
      while (currentTasks.some((task) => task.id === id)) {
        id += 1;
      }

      return [...currentTasks, { id, title: trimmedTitle, isDone: false }];
    });
  }

  function toggleTaskStatus(id) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, isDone: true } : task,
      ),
    );
  }

  function deleteTask(id) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
    setTaskToEdit((currentTask) =>
      currentTask?.id === id ? null : currentTask,
    );
  }

  function updateTask(id, newTitle) {
    const trimmedTitle = newTitle.trim();
    if (!trimmedTitle) {
      return;
    }

    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, title: trimmedTitle } : task,
      ),
    );
    setTaskToEdit(null);
  }

  function setEditingTask(task) {
    setTaskToEdit(task);
  }

  const completedCount = tasks.filter((task) => task.isDone).length;

  return (
    <main className="todo-app">
      <section className="todo-card" aria-labelledby="todo-title">
        <header className="todo-header">
          <div>
            <p className="todo-eyebrow">צעד קטן בכל פעם</p>
            <h1 id="todo-title">רשימת המשימות שלי</h1>
          </div>
          <span className="todo-total" aria-label={`${tasks.length} משימות`}>
            {tasks.length}
          </span>
        </header>

        <p className="todo-summary" aria-live="polite">
          {completedCount} מתוך {tasks.length} משימות הושלמו
        </p>

        <TodoForm
          addTask={addTask}
          updateTask={updateTask}
          taskToEdit={taskToEdit}
          onCancelEdit={() => setTaskToEdit(null)}
        />

        <div className="todo-list" aria-live="polite">
          {tasks.map((task) => (
            <TodoItem
              key={task.id}
              {...task}
              onToggle={toggleTaskStatus}
              onDelete={deleteTask}
              onEdit={setEditingTask}
            />
          ))}
          {tasks.length === 0 && (
            <p className="todo-empty">אין עדיין משימות. אפשר להוסיף אחת למעלה.</p>
          )}
        </div>
      </section>
    </main>
  );
}
