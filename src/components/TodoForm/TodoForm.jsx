import { useEffect, useState } from "react";
import "./TodoForm.css";

export default function TodoForm({
  addTask,
  updateTask,
  taskToEdit,
  onCancelEdit,
}) {
  const [title, setTitle] = useState("");

  useEffect(() => {
    setTitle(taskToEdit ? taskToEdit.title : "");
  }, [taskToEdit]);

  function handleSubmit(event) {
    event.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      return;
    }

    if (taskToEdit) {
      updateTask(taskToEdit.id, trimmedTitle);
    } else {
      addTask(trimmedTitle);
    }
    setTitle("");
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <label className="todo-input-label" htmlFor="todo-title-input">
        {taskToEdit ? "עריכת משימה" : "משימה חדשה"}
      </label>
      <div className="todo-form-controls">
        <input
          id="todo-title-input"
          className="todo-text-input"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="מה צריך לעשות?"
          autoComplete="off"
        />
        <button className="todo-submit-button" type="submit" disabled={!title.trim()}>
          {taskToEdit ? "עדכן" : "הוסף משימה"}
        </button>
        {taskToEdit && (
          <button
            className="todo-cancel-button"
            type="button"
            onClick={() => {
              onCancelEdit();
              setTitle("");
            }}
          >
            ביטול
          </button>
        )}
      </div>
    </form>
  );
}
