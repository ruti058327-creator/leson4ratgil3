import "./TodoItem.css";

function getTaskStatusClass(isDone) {
  return isDone ? "todo-item todo-item--done" : "todo-item todo-item--pending";
}

export default function TodoItem({
  id,
  title,
  isDone,
  onToggle,
  onDelete,
  onEdit,
}) {
  return (
    <article className={getTaskStatusClass(isDone)}>
      <span className="todo-item-indicator" aria-hidden="true" />
      <span className={`todo-item-title${isDone ? " todo-item-title--done" : ""}`}>
        {title}
      </span>
      <div className="todo-item-actions">
        {!isDone && (
          <button
            className="todo-action todo-action--complete"
            type="button"
            onClick={() => onToggle(id)}
            aria-label={`סמן את ${title} כבוצעה`}
          >
            בוצעה
          </button>
        )}
        <button
          className="todo-action todo-action--edit"
          type="button"
          onClick={() => onEdit({ id, title, isDone })}
          aria-label={`ערוך את ${title}`}
        >
          עריכה
        </button>
        <button
          className="todo-action todo-action--delete"
          type="button"
          onClick={() => onDelete(id)}
          aria-label={`מחק את ${title}`}
        >
          מחיקה
        </button>
      </div>
    </article>
  );
}
